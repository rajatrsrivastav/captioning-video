# Video Captioning with Hinglish Support

> Complete video captioning solution: Upload MP4 → Generate Hinglish captions → Preview → Export

## 🎯 Project Structure

### Essential Files Only
```
captioning-video-1/
├── captioning-video-backend/
│   ├── package.json              # Node.js dependencies
│   ├── server.js                 # Express server (main)
│   ├── requirements.txt          # Python dependencies
│   ├── setup-python.sh          # Python environment setup
│   ├── routes/
│   │   └── transcribe.routes.js  # Upload & transcription API
│   └── src/utils/
│       └── whisper.py           # Hinglish model script
│
└── captioning-video-frontend/
    ├── package.json              # React + Remotion dependencies
    ├── remotion.config.js        # Remotion configuration
    └── src/
        ├── Root.jsx              # Main Remotion component
        ├── MyVideo.jsx           # Video composition
        ├── StudioUI.jsx          # Upload interface
        ├── CaptionOverlay.jsx    # Caption styling
        └── VideoContext.jsx      # State management
```

## ⚡ Complete Setup

### Prerequisites
```bash
# Install Node.js 18+, Python 3.8+, FFmpeg
# macOS: brew install node python ffmpeg
# Linux: sudo apt install nodejs python3 ffmpeg
```

### One-Time Setup
```bash
# 1. Clone and navigate
git clone https://github.com/rajatrsrivastav/captioning-video.git
cd captioning-video-1

# 2. Backend (Python + Node.js)
cd captioning-video-backend
./setup-python.sh && npm install

# 3. Frontend (React + Remotion)
cd ../captioning-video-frontend  
npm install
```

### Run Application
```bash
# Terminal 1: Backend (port 4000)
cd captioning-video-backend
node server.js

# Terminal 2: Frontend (port 3000)
cd captioning-video-frontend
npm start
```

## 🎬 Usage

### Simple Workflow
1. **Start both servers** (backend :4000, frontend :3000)
2. **Upload MP4** → Frontend automatically sends to backend
3. **Auto-transcription** → Hinglish model processes audio
4. **Preview captions** → Real-time preview in Remotion
5. **Export video** → Final MP4 with embedded captions

### Key Features
- **Hinglish Support**: Hindi-English mixed content
- **Smart Timing**: 2-3 second readable segments  
- **Multiple Styles**: Bottom/Top/Karaoke layouts
- **Auto-processing**: Upload → Transcribe → Preview → Export

## ⚙️ Technical Details

### Caption Processing Flow
```
MP4 Upload → FFmpeg Audio Extract → 8s Chunks → Hinglish Model → 
Word Splitting → 2-3s Segments → WebVTT → Remotion Preview
```

### Key Files
- `server.js` - Express server with upload handling
- `routes/transcribe.routes.js` - API endpoint (25 lines only)
- `src/utils/whisper.py` - Hinglish transcription script
- `StudioUI.jsx` - Frontend upload interface
- `CaptionOverlay.jsx` - Caption styling components

## 🔧 Troubleshooting

### Quick Fixes
```bash
# Backend won't start
cd captioning-video-backend && node server.js

# Python modules missing  
cd captioning-video-backend && ./setup-python.sh

# Frontend build errors
cd captioning-video-frontend && npm install

# Test Hinglish model
cd captioning-video-backend && source venv/bin/activate && python3 src/utils/whisper.py
```

### Common Issues
```bash
# Python environment issues
cd captioning-video-backend && ./setup-python.sh

# Port already in use  
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:4000 | xargs kill -9  # Backend

# Dependencies missing
npm install  # In both frontend and backend folders
```

### Testing Setup
```bash
# Test backend
curl http://localhost:4000

# Test Hinglish model
cd captioning-video-backend
source venv/bin/activate  
python3 src/utils/whisper.py
```

## 📦 Tech Stack

- **Frontend**: React 19 + Remotion 4.0 + Tailwind CSS
- **Backend**: Express.js + Multer + CORS  
- **ML**: Python + PyTorch + Transformers + Librosa
- **Model**: Oriserve/Whisper-Hindi2Hinglish-Swift
- **Processing**: FFmpeg + WebVTT format

---

**Ready to use!** 🎬 Upload your first video and generate Hinglish captions.  
*Updated: September 29, 2025*