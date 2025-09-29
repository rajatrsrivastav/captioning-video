#!/bin/bash
set -e

echo "Setting up Python environment..."

# Upgrade pip first
python -m pip install --upgrade pip

# Install requirements
if [ -f "requirements.txt" ]; then
    echo "Installing Python dependencies from requirements.txt..."
    python -m pip install -r requirements.txt
else
    echo "requirements.txt not found, installing packages individually..."
    python -m pip install torch==2.1.0+cpu torchvision==0.16.0+cpu torchaudio==2.1.0+cpu --index-url https://download.pytorch.org/whl/cpu
    python -m pip install transformers==4.35.0
    python -m pip install librosa==0.10.1
    python -m pip install soundfile==0.12.1
    python -m pip install numpy==1.24.4
fi

# Test the installation
echo "Testing Python dependencies..."
python -c "
try:
    import torch
    import transformers
    import librosa
    print('All Python dependencies installed successfully!')
    print(f'PyTorch version: {torch.__version__}')
    print(f'Transformers version: {transformers.__version__}')
    print(f'Librosa version: {librosa.__version__}')
except ImportError as e:
    print(f'Import error: {e}')
    exit(1)
"

echo "Python environment setup complete!"