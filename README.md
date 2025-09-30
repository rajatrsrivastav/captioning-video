# Video Captioning with Hinglish Support

> Complete video captioning solution: Upload MP4 → Generate Hinglish captions → Preview → Export

## 🎯 Project Structure

### Essential Files Only
```
captioning-video/
├── captioning-video-backend/
│   ├── package.json              # Node.js dependencies
│   ├── server.js                 # Express server (main)
│   ├── .env                      # Environment variables
│   ├── routes/
│   │   └── transcribe.routes.js  # Upload & transcription API
│   └── src/utils/
│       └── whisper.py           # Hinglish model script (uses system python3)
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

# Install Python packages globally
pip3 install torch transformers librosa soundfile numpy accelerate datasets
```

### One-Time Setup
```bash
# 1. Clone and navigate
git clone https://github.com/rajatrsrivastav/captioning-video.git
cd captioning-video

# 2. Backend setup
cd captioning-video-backend
npm install

# 3. Frontend setup  
cd ../captioning-video-frontend
npm install

# 4. Create frontend environment file
echo "REACT_APP_BACKEND_URL=http://localhost:4000" > .env
```

### Run Application
```bash
# Terminal 1: Backend (port 4000)
cd captioning-video-backend
npm start

# Terminal 2: Frontend (port 3000)
cd captioning-video-frontend
npm run dev
```

## ✅ Verification Steps

### Test Your Setup
```bash
# 1. Verify backend is running
curl http://localhost:4000
# Should return: {"message":"Captioning Video Backend is running!"}

# 2. Verify Python packages
python3 -c "import torch, transformers, librosa; print('✓ All Python imports work')"

# 3. Test frontend
# Open browser: http://localhost:3000
# Should see Remotion Studio interface
```

## 🎬 Usage

### Complete Workflow
1. **Start both servers** (backend :4000, frontend :3000)
2. **Upload MP4** → Click "Choose Video" and select your MP4 file
3. **Generate Captions** → Click "Generate Captions" button  
4. **Auto-transcription** → Backend processes with Hinglish model
5. **Preview captions** → Real-time preview appears in Remotion player
6. **Export video** → Use Remotion's export features

### Expected Output
- **Upload**: File selected, shows ✓ filename
- **Processing**: Button shows "Processing..." 
- **Success**: Captions appear overlaid on video
- **Console**: Shows "Captions loaded: X" message

### Key Features
- **Hinglish Support**: Hindi-English mixed content
- **Smart Timing**: 2-3 second readable segments  
- **Multiple Styles**: Bottom Center, Top Bar
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
cd captioning-video-backend && npm start

# Frontend-Backend connection issues
# Make sure frontend .env file exists:
echo "REACT_APP_BACKEND_URL=http://localhost:4000" > captioning-video-frontend/.env

# Python modules missing  
pip3 install torch transformers librosa soundfile numpy accelerate datasets

# Frontend build errors
cd captioning-video-frontend && npm install

# Test Hinglish model
cd captioning-video-backend && python3 src/utils/whisper.py
```

### Common Issues
```bash
# Python packages missing
pip3 install torch transformers librosa soundfile numpy accelerate datasets

# Port already in use  
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:4000 | xargs kill -9  # Backend

# Dependencies missing
npm install  # In both frontend and backend folders
```

### Testing Setup
```bash
# Test backend (should show server running message)
curl http://localhost:4000

# Test Hinglish model (should show model loading)
cd captioning-video-backend && python3 src/utils/whisper.py

# Test frontend-backend connection
# 1. Open browser: http://localhost:3000
# 2. Upload an MP4 file
# 3. Click "Generate Captions"
# 4. Check browser console - should show "Captions loaded: X"
```

### What You Should See
- **Backend Terminal**: "Server running on port 4000"
- **Frontend Browser**: Remotion Studio interface
- **After Upload**: ✓ filename.mp4 displayed
- **During Processing**: "Processing..." button
- **Success**: Video with captions overlaid
- **Browser Console**: "Captions loaded: [number]"

## 📦 Tech Stack

- **Frontend**: React 19 + Remotion 4.0 + Tailwind CSS
- **Backend**: Express.js + Multer + CORS  
- **ML**: Python + PyTorch + Transformers + Librosa
- **Model**: Oriserve/Whisper-Hindi2Hinglish-Swift
- **Processing**: FFmpeg + WebVTT format

---

**Ready to use!** 🎬 Upload your first video and generate Hinglish captions.  
*Updated: September 29, 2025*