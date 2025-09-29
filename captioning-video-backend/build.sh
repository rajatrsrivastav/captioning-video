#!/bin/bash
set -e

echo "=== Starting Build Process ==="

# Install Node.js dependencies
echo "Installing Node.js dependencies..."
npm ci

# Check Python availability
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python not found"
    exit 1
fi

echo "Using Python command: $PYTHON_CMD"

# Install Python dependencies
echo "Installing Python dependencies..."
$PYTHON_CMD -m pip install --upgrade pip

# Install PyTorch CPU version explicitly for Render
echo "Installing PyTorch CPU version..."
$PYTHON_CMD -m pip install torch==2.1.0+cpu torchvision==0.16.0+cpu torchaudio==2.1.0+cpu --index-url https://download.pytorch.org/whl/cpu

# Install other Python packages
echo "Installing other Python packages..."
$PYTHON_CMD -m pip install transformers==4.35.0
$PYTHON_CMD -m pip install librosa==0.10.1
$PYTHON_CMD -m pip install soundfile==0.12.1
$PYTHON_CMD -m pip install numpy==1.24.4
$PYTHON_CMD -m pip install accelerate==0.24.1

# Test imports
echo "Testing Python imports..."
$PYTHON_CMD -c "
import torch
import transformers
import librosa
print('✓ All imports successful')
print(f'PyTorch: {torch.__version__}')
print(f'Transformers: {transformers.__version__}')
"

echo "=== Build Complete ==="