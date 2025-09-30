#!/usr/bin/env python3
"""
Hinglish Whisper model processor using specialized Hindi-to-Hinglish model
"""

import sys
import json
import argparse
import torch
import numpy as np
import librosa
import soundfile as sf
from transformers import WhisperProcessor, WhisperForConditionalGeneration
import warnings
warnings.filterwarnings("ignore")

def transcribe_hinglish(audio_path, model_name="Oriserve/Whisper-Hindi2Hinglish-Swift"):
    """
    Transcribe audio using specialized Hindi to Hinglish Whisper model
    
    Args: 
        audio_path (str): Path to audio file
        model_name (str): Hugging Face model identifier
    
    Returns:
        dict: Transcription results with segments and timestamps
    """
    try:
        # Load the specialized Hindi2Hinglish model
        print(f"Loading specialized Hinglish model: {model_name}", file=sys.stderr)
        processor = WhisperProcessor.from_pretrained(model_name)
        model = WhisperForConditionalGeneration.from_pretrained(model_name)
        
        # Load and preprocess audio using librosa (more robust for various formats)
        print(f"Loading audio: {audio_path}", file=sys.stderr)
        
        # Load audio with librosa (handles MP3, WAV, etc.)
        waveform, sample_rate = librosa.load(audio_path, sr=16000, mono=True)
        
        # Convert to torch tensor and add batch dimension
        waveform = torch.from_numpy(waveform).unsqueeze(0)
        
        # Process audio in smaller chunks for better caption timing
        chunk_length = 8 * 16000  # 8 seconds at 16kHz (better for readable captions)
        audio_length = waveform.shape[1]
        
        segments = []
        
        for start in range(0, audio_length, chunk_length):
            end = min(start + chunk_length, audio_length)
            chunk = waveform[:, start:end]
            
            # Skip empty chunks
            if chunk.shape[1] == 0:
                continue
            
            # Process with the model
            inputs = processor(
                chunk.squeeze().numpy(), 
                sampling_rate=16000, 
                return_tensors="pt"
            )
            
            input_features = inputs.input_features
            
            # Generate transcription optimized for Hindi2Hinglish model
            predicted_ids = model.generate(
                input_features,
                max_new_tokens=150,  # Reduced for shorter chunks
                num_beams=1,  # Fast processing
                temperature=0.1,  # Slight randomness for better Hinglish flow
                do_sample=False,
                use_cache=True,
                pad_token_id=processor.tokenizer.eos_token_id
            )
            
            # Decode the transcription
            transcription = processor.batch_decode(
                predicted_ids, 
                skip_special_tokens=True
            )[0]
            
            if transcription.strip():
                start_time = start / 16000
                end_time = end / 16000
                
                # Split long text into smaller caption segments (max 2-3 seconds each)
                words = transcription.strip().split()
                if len(words) > 8:  # If more than 8 words, split into smaller segments
                    chunk_duration = end_time - start_time
                    words_per_segment = 6  # ~2-3 seconds worth of words
                    
                    for i in range(0, len(words), words_per_segment):
                        word_chunk = words[i:i + words_per_segment]
                        segment_start = start_time + (i / len(words)) * chunk_duration
                        segment_end = start_time + ((i + len(word_chunk)) / len(words)) * chunk_duration
                        
                        segments.append({
                            "id": len(segments),
                            "start": segment_start,
                            "end": segment_end,
                            "text": " ".join(word_chunk)
                        })
                else:
                    segments.append({
                        "id": len(segments),
                        "start": start_time,
                        "end": end_time,
                        "text": transcription.strip()
                    })
        
        # Combine results
        full_text = " ".join([seg["text"] for seg in segments])
        
        result = {
            "text": full_text,
            "segments": segments,
            "language": "hi",  # Hindi/Hinglish
            "model": model_name
        }
        
        return result
        
    except Exception as e:
        print(f"Error in Hinglish transcription: {str(e)}", file=sys.stderr)
        raise

def main():
    parser = argparse.ArgumentParser(description='Hinglish Whisper Transcription')
    parser.add_argument('audio_path', help='Path to audio file')
    parser.add_argument('--model', default='Oriserve/Whisper-Hindi2Hinglish-Swift', 
                       help='Hugging Face model name')
    parser.add_argument('--output', help='Output JSON file path')
    
    args = parser.parse_args()
    
    try:
        result = transcribe_hinglish(args.audio_path, args.model)
        
        if args.output:
            with open(args.output, 'w', encoding='utf-8') as f:
                json.dump(result, f, ensure_ascii=False, indent=2)
        else:
            print(json.dumps(result, ensure_ascii=False, indent=2))
            
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()