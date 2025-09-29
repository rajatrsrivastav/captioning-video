#!/bin/bash
set -e

echo "🐍 Setting up Python environment for production..."

# Check if running in production (Render)
if [ "$NODE_ENV" = "production" ]; then
    echo "📦 Production environment detected - installing dependencies globally..."
    
    # Upgrade pip
    echo "⬆️  Upgrading pip..."
    pip install --upgrade pip
    
    # Install requirements
    if [ -f "requirements.txt" ]; then
        echo "� Installing Python dependencies from requirements.txt..."
        pip install -r requirements.txt
    else
        echo "⚠️  requirements.txt not found, installing packages individually..."
        pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu
        pip install transformers>=4.30.0
        pip install librosa>=0.10.0
        pip install soundfile>=0.12.0
        pip install numpy>=1.24.0
        pip install accelerate>=0.20.0
        pip install datasets>=2.12.0
    fi
    
else
    echo "🛠️  Development environment detected..."
    
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
    
    echo "💡 To activate the environment manually, run: source venv/bin/activate"
fi

# Test the installation
echo "🧪 Testing Python dependencies..."
python3 -c "
try:
    import torch
    import transformers
    import librosa
    print('✅ All Python dependencies installed successfully!')
    print(f'PyTorch version: {torch.__version__}')
    print(f'Transformers version: {transformers.__version__}')
    print(f'Librosa version: {librosa.__version__}')
except ImportError as e:
    print(f'❌ Import error: {e}')
    exit(1)
"

echo "✅ Python environment setup complete!"