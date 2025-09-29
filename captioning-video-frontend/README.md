# Captioning Video (Remotion)

> Simple app to upload an MP4, generate captions, preview in Remotion, and export an MP4.

## Requirements
- Node.js 18+ (tested with 20.x)
- macOS (works on Windows/Linux too)
- Optional: Whisper.cpp running on http://localhost:4000 for auto captions

## Setup
```bash
npm install
echo "BACKEND_URL=http://localhost:4000" > .env   # optional
npm run dev
```
Open http://localhost:3000

## Use it
1) Click “Choose Video” and pick an MP4
2) Click “Generate Captions” (needs backend running)
3) Pick a caption style (bottom / top / karaoke)
4) Preview in the canvas

## Notes
- Fonts: Uses Noto Sans + Noto Sans Devanagari (needs internet)
- Outputs: Check the out/ folder (sample files may be there)
- Backend: POST /api/v1/transcribe (FormData: video)

## That’s it
Small, simple, and works locally. If something breaks, restart `npm run dev` and try again.

### ✅ Working Features
- **Video Upload**: Upload MP4 files via drag-and-drop interface
- **Automatic Transcription**: Generate captions using local Whisper.cpp
- **Real-time Preview**: View video with captions in Remotion studio
- **Multiple Caption Styles**: 2 predefined caption presets
- **WebVTT Parsing**: Convert Whisper output to timed captions


### ❌ Known Limitations
- No cloud deployment (local development only)
- Fixed composition duration (requires manual adjustment for longer videos)
- Internet required for Google Fonts

## 🛠 Technology Stack

- **Frontend**: React 19.0.0 + Remotion 4.0.354
- **Styling**: Tailwind CSS 4.0.0
- **Backend**: Node.js/Express
- **Speech-to-Text**: Whisper.cpp (local)
- **Video Processing**: Remotion CLI

## 📋 Prerequisites

- **Node.js**: Version 18+ (recommended: 20.x)
- **npm**: Version 8+
- **Git**: For cloning repository
- **Whisper.cpp**: For speech-to-text (optional for demo)

## 🚀 Local Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create `.env` file:
```bash
BACKEND_URL=http://localhost:4000
```

### 4. Start Development Server
```bash
npm run dev
```
This opens Remotion Studio at `http://localhost:3000`

### 5. (Optional) Setup Whisper.cpp Backend
```bash
# Clone Whisper.cpp
git clone https://github.com/ggml-org/whisper.cpp
cd whisper.cpp

# Build
make

# Download model
bash ./models/download-ggml-model.sh base

# Create basic Express server at localhost:4000
# (Implementation details in backend setup section)
```

## 🎯 Usage Instructions

### Basic Demo (Without Backend)
1. Start development server: `npm run dev`
2. Upload an MP4 file using "Choose Video" button
3. Video appears in Remotion preview
4. Manually add sample captions for testing
5. Export video using Remotion CLI

### Full Workflow (With Backend)
1. Start both frontend (`npm run dev`) and backend server
2. Upload MP4 video file
3. Click "Generate Captions" (calls Whisper.cpp API)
4. Captions appear overlaid on video
5. Adjust caption style (Bottom Center/Top Bar/Karaoke)
6. Export final video

## 📁 Project Structure

```
captioning-video/
├── src/
│   ├── StudioUI.jsx          # Main toolbar with upload/controls
│   ├── VideoContext.jsx      # React context for state management
│   ├── MyVideo.jsx          # Main Remotion composition
│   ├── CaptionOverlay.jsx   # Caption rendering component
│   ├── Root.jsx            # Remotion root with compositions
│   ├── utils/
│   │   └── vttParser.js    # WebVTT format parser
│   └── StudioUI.css        # Styling for toolbar
├── out/                    # Rendered video outputs
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎬 Video Export

### Method 1: Basic Export (Current Working)
```bash
# Render first 1000 frames (33 seconds at 30fps)
npx remotion render MyVideo out/video.mp4 --frames=0-1000
```

### Method 2: Full Video Export
```bash
# For longer videos, adjust frame count based on duration
npx remotion render MyVideo out/captioned-video.mp4 --frames=0-[FRAME_COUNT]
```

**Calculate Frame Count**: `duration_in_seconds × 30 (fps)`

Example: 5-minute video = 300 × 30 = 9000 frames

## 📊 Sample Files

### Input Sample
- **Location**: Upload any MP4 file via UI
- **Recommended**: 30 seconds to 2 minutes for testing
- **Format**: MP4, 1920×1080 preferred

### Output Sample
- **Location**: `out/captioned-video.mp4`
- **Contains**: Original video + overlaid captions
- **Styles**: Configurable (bottom-center, top-bar, karaoke)

## 🔧 Configuration

### Caption Styles
Edit `src/CaptionOverlay.jsx` to customize:
- Font family (currently: Noto Sans + Noto Sans Devanagari)
- Colors and backgrounds
- Positioning and sizing
- Animation effects

### Video Composition
Edit `src/Root.jsx` to modify:
- Video dimensions (default: 1920×1080)
- Frame rate (default: 30fps)
- Duration (default: 300 frames = 10 seconds)

## 🐛 Troubleshooting

### Common Issues

**1. "durationInFrames" Error**
- **Problem**: Frame range exceeds composition duration
- **Solution**: Adjust `durationInFrames` in `Root.jsx` or reduce `--frames` parameter

**2. Blank Video Output**
- **Problem**: No video uploaded or context not available during CLI render
- **Solution**: Ensure video is uploaded in UI before rendering

**3. Missing Captions**
- **Problem**: No captions generated or WebVTT parsing failed
- **Solution**: Check backend connection and Whisper.cpp setup

**4. Font Loading Issues**
- **Problem**: Hinglish text not rendering properly
- **Solution**: Ensure internet connection for Google Fonts

### Debug Commands
```bash
# Check Remotion version
npx remotion --version

# Validate composition
npx remotion validate

# Bundle check
npm run build
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Dynamic composition duration based on uploaded video
- [ ] Cloud deployment (Vercel/Netlify)
- [ ] Multiple language support
- [ ] Advanced caption styling options
- [ ] Batch video processing
- [ ] Real-time transcription progress

### Backend TODOs
- [ ] Complete Whisper.cpp integration
- [ ] Language selection API endpoint
- [ ] File upload handling
- [ ] Error handling and validation

## 📝 Development Notes

### Working Components
- ✅ React Context state management
- ✅ File upload with duration detection
- ✅ WebVTT parser for caption timing
- ✅ Three caption style presets
- ✅ Remotion video composition
- ✅ Basic CLI rendering

### Integration Points
- Frontend ↔ Backend: `/api/v1/transcribe` endpoint
- Whisper.cpp ↔ API: File processing and WebVTT output
- Remotion ↔ Context: Video and caption state sharing

## 📄 License

This project is for educational/demonstration purposes. 

## 🙋‍♂️ Support

For issues related to:
- **Remotion**: [Remotion Discord](https://discord.gg/6VzzNDwUwV)
- **Whisper.cpp**: [GitHub Issues](https://github.com/ggml-org/whisper.cpp/issues)
- **This Project**: Create an issue in this repository

---

**Last Updated**: September 29, 2025  
**Remotion Version**: 4.0.354  
**Node.js Tested**: 18.x, 20.x

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/JonnyBurger/remotion/blob/main/LICENSE.md).
