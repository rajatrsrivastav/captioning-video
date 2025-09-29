#!/bin/bash

# Python Environment Setup for Hinglish Whisper
echo "🐍 Setting up Python environment for Hinglish Whisper..."

# Check if Python 3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

# Check Python version
PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "🔍 Found Python version: $PYTHON_VERSION"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📚 Installing Python dependencies..."
pip install -r requirements.txt

# Test the installation
echo "🧪 Testing Hinglish Whisper installation..."
python3 -c "
import torch
import transformers
import librosa
print('✅ All Python dependencies installed successfully!')
print(f'PyTorch version: {torch.__version__}')
print(f'Transformers version: {transformers.__version__}')
print(f'Librosa version: {librosa.__version__}')
"

echo "✅ Python environment setup complete!"
echo "💡 To activate the environment manually, run: source venv/bin/activate"