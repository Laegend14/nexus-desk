import os
import sys
import wave
import subprocess
import win32com.client
from PIL import Image, ImageSequence, ImageDraw, ImageFont

def main():
    print("=== NexusDesk 2.6-Minute Video Generator with Voiceover & Captions ===")
    
    # 1. Define the 7 Scenes: Voice Script, Title Badge, and Subtitle Lines
    scenes = [
        {
            "id": 1,
            "badge": "PHASE 1 · PLATFORM OVERVIEW & 24/7 MARKET PROBLEM",
            "script": "Welcome to NexusDesk, a dual-lens AI research workstation for the Bitget AI Base Camp Hackathon Season 2. In modern markets, tokenized US equities trade 24/7. When earnings or weekend macro shocks hit, traditional exchanges are closed, but crypto and tokenized equities reprice immediately. NexusDesk unifies both worlds into a single, high-speed research terminal.",
            "title": "NEXUSDESK • DUAL-LENS AI RESEARCH WORKSTATION",
            "subtitle": "Unifying Crypto & Tokenized US Equities in a 24/7 Continuous Trading Era",
            "frame_start_pct": 0.0,
            "frame_end_pct": 0.12
        },
        {
            "id": 2,
            "badge": "PHASE 2 · DUAL-LENS CONTINUOUS TICKER & SENTIMENT",
            "script": "On the landing page, our continuous ticker tape tracks real-time prices, spreads, and catalysts across crypto pairs like Bitcoin and Solana alongside tokenized equities like Tesla and Nvidia. Notice the cross-market sentiment: crypto greed is at 68, leading traditional equities at 64 by plus 4 points. Let us launch the workstation.",
            "title": "CONTINUOUS TICKER TAPE & LIVE MARKET RADAR",
            "subtitle": "Tracking Crypto & Tokenized Equities • Crypto Sentiment (68) leads US Equities (64)",
            "frame_start_pct": 0.12,
            "frame_end_pct": 0.25
        },
        {
            "id": 3,
            "badge": "PHASE 3 · TRADING TERMINAL COCKPIT & GAP DETECTION",
            "script": "We enter the live terminal cockpit. On the right, we have institutional TradingView charting and gap tracking. We select Tesla, ticker TSLA. While the native stock closed Friday at 368 dollars and 16 cents, the 24/7 rToken is trading at 356 dollars and 58 cents, detecting a significant negative 3.15 percent weekend gap anomaly.",
            "title": "LIVE TERMINAL COCKPIT • TSLA GAP DISCOVERY",
            "subtitle": "Native Close: $368.16 vs 24/7 rToken: $356.58 (-3.15% Weekend Gap Anomaly)",
            "frame_start_pct": 0.25,
            "frame_end_pct": 0.40
        },
        {
            "id": 4,
            "badge": "PHASE 4 · 5-SKILL AI RESEARCH SYNTHESIS (QWEN 3.8-MAX)",
            "script": "In the AI research desk, we input our trade hypothesis: analyze Tesla earnings catalyst against Bitcoin and tech beta. We trigger the multi-angle synthesis. Powered by Alibaba Cloud Qwen 3.8-Max through the Bitget gateway, NexusDesk concurrently scans macro policy, futures order book depth, corporate news headlines, market sentiment, and technical indicators.",
            "title": "5-ANGLE AI RESEARCH SYNTHESIS",
            "subtitle": "Powered by Alibaba Cloud Qwen 3.8-Max via Bitget Gateway (Macro, Sentiment, Intel, Tech)",
            "frame_start_pct": 0.40,
            "frame_end_pct": 0.58
        },
        {
            "id": 5,
            "badge": "PHASE 5 · ACTIONABLE TRADE MEMO & RISK BOUNDS",
            "script": "Within seconds, the synthesis compiles a structured trade memo. The model detects a bullish gap-fill breakout with a suggested entry zone of 344 dollars, take-profit targets at 356 and 368 dollars, and a hard stop-loss at 340 dollars and 7 cents. This gives a disciplined risk-to-reward ratio of 2.8 to 1, backed by clear catalyst invalidation rules.",
            "title": "STRUCTURED ACTIONABLE TRADE MEMO",
            "subtitle": "Entry: $344.20 | Stop Loss: $340.07 | Take Profit: $368.16 | Risk/Reward Ratio: 2.8:1",
            "frame_start_pct": 0.58,
            "frame_end_pct": 0.75
        },
        {
            "id": 6,
            "badge": "PHASE 6 · BITGET UTA v3 PAPER EXECUTION TICKET",
            "script": "Next, we click Arm Execution Ticket. The AI parameters auto-populate into the Bitget Unified Trading Account ticket. We configure 15 shares with a 1.2 percent stop loss and execute the order. The simulated trade routes directly through the Bitget UTA paper gateway, confirming an immediate fill with complete transaction receipts.",
            "title": "BITGET UTA v3 PAPER EXECUTION TICKET",
            "subtitle": "Filled BUY 15 TSLA @ $344.20 via Bitget Paper Trading Gateway (Order #_l0ne5)",
            "frame_start_pct": 0.75,
            "frame_end_pct": 0.88
        },
        {
            "id": 7,
            "badge": "PHASE 7 · BITGET PLAYBOOK EXPORT & SUPABASE ARCHIVE",
            "script": "With one click, we export the trade parameters into a standardized quantitative strategy JSON payload, formatted for automated deployment on Bitget Playbook. Finally, the History tab confirms our research memo is permanently stored in Supabase PostgreSQL for future review. This completes the end-to-end research-to-execution workflow on NexusDesk.",
            "title": "PLAYBOOK STRATEGY EXPORT & SUPABASE ARCHIVE",
            "subtitle": "Full Flow Verified: Query -> 5 Skills -> Memo -> Bitget Ticket -> Playbook Export",
            "frame_start_pct": 0.88,
            "frame_end_pct": 1.0
        }
    ]

    os.makedirs("temp_video_build", exist_ok=True)

    # 2. Generate Audio Tracks using Windows SAPI at Rate = 1
    print("\n--- Generating Audio Voiceover Segments ---")
    speaker = win32com.client.Dispatch("SAPI.SpVoice")
    speaker.Rate = 1 # Professional, crisp presentation pace

    for i in range(speaker.GetVoices().Count):
        desc = speaker.GetVoices().Item(i).GetDescription()
        if "David" in desc:
            speaker.Voice = speaker.GetVoices().Item(i)
            print(f"Selected voice: {desc}")
            break

    audio_files = []
    durations = []

    for sc in scenes:
        wav_path = f"temp_video_build/scene_{sc['id']}.wav"
        stream = win32com.client.Dispatch("SAPI.SpFileStream")
        stream.Open(wav_path, 3) # SSFMCreateForWrite = 3
        speaker.AudioOutputStream = stream
        speaker.Speak(sc['script'])
        stream.Close()
        
        # Measure duration
        with wave.open(wav_path, 'rb') as w:
            dur = w.getnframes() / float(w.getframerate())
            durations.append(dur)
            print(f"Scene {sc['id']}: {dur:.2f} seconds")
        audio_files.append(wav_path)

    total_voice_duration = sum(durations)
    print(f"\nTotal Voiceover Duration: {total_voice_duration:.2f}s ({total_voice_duration/60:.2f} minutes)")

    # 3. Concatenate Audio into master WAV with 0.3s pause between scenes
    master_wav = "temp_video_build/master_audio.wav"
    with wave.open(audio_files[0], 'rb') as first_w:
        params = first_w.getparams()
        framerate = first_w.getframerate()
        nchannels = first_w.getnchannels()
        sampwidth = first_w.getsampwidth()

    silence_frames = b'\x00' * int(framerate * 0.3 * nchannels * sampwidth)

    with wave.open(master_wav, 'wb') as out_w:
        out_w.setparams(params)
        for i, af in enumerate(audio_files):
            with wave.open(af, 'rb') as in_w:
                out_w.writeframes(in_w.readframes(in_w.getnframes()))
            if i < len(audio_files) - 1:
                out_w.writeframes(silence_frames)
            else:
                out_w.writeframes(b'\x00' * int(framerate * 1.0 * nchannels * sampwidth))

    with wave.open(master_wav, 'rb') as mw:
        final_video_duration = mw.getnframes() / float(mw.getframerate())
    print(f"Final Audio & Video Duration: {final_video_duration:.2f}s ({final_video_duration/60:.2f} minutes)")

    # 4. Load WebP Animation Frames
    print("\n--- Loading WebP Animation Frames ---")
    raw_webp = Image.open("docs/ai_desk_walkthrough.webp")
    total_raw_frames = raw_webp.n_frames
    all_frames = []
    for f in ImageSequence.Iterator(raw_webp):
        all_frames.append(f.convert("RGB"))
    print(f"Loaded {len(all_frames)} frames from docs/ai_desk_walkthrough.webp")

    # Target video resolution: 1366 x 692 (even height for H.264)
    target_w, target_h = 1366, 692
    fps = 15 # 15 fps gives ultra-smooth screen recording and fast encoding
    total_output_frames = int(final_video_duration * fps)
    print(f"Generating {total_output_frames} video frames at {fps} fps...")

    # Load Fonts
    try:
        font_badge = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 16)
        font_title = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 22)
        font_sub = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 17)
        font_time = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 14)
    except:
        font_badge = ImageFont.load_default()
        font_title = font_badge
        font_sub = font_badge
        font_time = font_badge

    # Calculate timestamps for each scene
    scene_starts = []
    current_time = 0.0
    for i, dur in enumerate(durations):
        scene_starts.append(current_time)
        current_time += dur + 0.3

    # 5. Start ffmpeg process to encode H.264 MP4 with master audio
    output_mp4 = "docs/ai_desk_walkthrough.mp4"
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{target_w}x{target_h}",
        "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-", # Pipe video from Python
        "-i", master_wav, # Audio input
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "21",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-shortest",
        output_mp4
    ]

    print("\n--- Starting FFmpeg Encoding Pipeline ---")
    proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE)

    for frame_idx in range(total_output_frames):
        t = frame_idx / float(fps)
        
        # Determine active scene
        active_scene_idx = 0
        for i, s_start in enumerate(scene_starts):
            if t >= s_start:
                active_scene_idx = i

        sc = scenes[active_scene_idx]
        sc_start = scene_starts[active_scene_idx]
        sc_dur = durations[active_scene_idx]
        sc_progress = min(1.0, max(0.0, (t - sc_start) / max(0.1, sc_dur)))

        # Map to source webp frame
        raw_idx = int((sc['frame_start_pct'] + sc_progress * (sc['frame_end_pct'] - sc['frame_start_pct'])) * (total_raw_frames - 1))
        raw_idx = max(0, min(total_raw_frames - 1, raw_idx))
        
        base_img = all_frames[raw_idx].copy()
        if base_img.size != (target_w, target_h):
            base_img = base_img.resize((target_w, target_h), Image.Resampling.BILINEAR)

        # Draw Overlay
        draw = ImageDraw.Draw(base_img, "RGBA")

        # 1. Top Scene Phase Badge (Sleek Dark Pill with Orange Accent)
        badge_text = sc["badge"]
        badge_w = 580
        badge_h = 32
        badge_x = (target_w - badge_w) // 2
        badge_y = 10

        draw.rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + badge_h], fill=(22, 19, 16, 235), outline=(255, 107, 0, 220), width=2)
        draw.rectangle([badge_x, badge_y, badge_x + 5, badge_y + badge_h], fill=(255, 107, 0, 255))
        draw.text((badge_x + 18, badge_y + 6), badge_text, fill=(255, 200, 150), font=font_badge)

        # 2. Lower-Third Subtitle Container
        lt_h = 86
        lt_y = target_h - lt_h - 14
        lt_x = 24
        lt_w = target_w - 48

        # Dark Glass Backing
        draw.rectangle([lt_x, lt_y, lt_x + lt_w, lt_y + lt_h], fill=(16, 14, 12, 235), outline=(255, 107, 0, 200), width=2)
        # Left Orange Brand Accent Line
        draw.rectangle([lt_x, lt_y, lt_x + 6, lt_y + lt_h], fill=(255, 107, 0, 255))

        # Title / Action Line
        draw.text((lt_x + 22, lt_y + 12), sc["title"], fill=(255, 136, 0), font=font_title)
        # Subtitle Narration Line
        draw.text((lt_x + 22, lt_y + 44), sc["subtitle"], fill=(255, 255, 255), font=font_sub)

        # Timer Indicator on the right
        curr_min = int(t) // 60
        curr_sec = int(t) % 60
        tot_min = int(final_video_duration) // 60
        tot_sec = int(final_video_duration) % 60
        time_str = f"{curr_min:02d}:{curr_sec:02d} / {tot_min:02d}:{tot_sec:02d}"
        draw.text((lt_x + lt_w - 140, lt_y + 16), time_str, fill=(200, 200, 200), font=font_time)

        # Progress bar along bottom of lower-third container
        bar_w = int((t / final_video_duration) * (lt_w - 12))
        draw.rectangle([lt_x + 6, lt_y + lt_h - 4, lt_x + 6 + bar_w, lt_y + lt_h], fill=(255, 107, 0, 255))

        # Send RGB bytes to ffmpeg
        proc.stdin.write(base_img.tobytes())

        if frame_idx % 250 == 0 or frame_idx == total_output_frames - 1:
            pct = (frame_idx / total_output_frames) * 100
            print(f"Rendered frame {frame_idx}/{total_output_frames} ({pct:.1f}%) - Time: {t:.1f}s / {final_video_duration:.1f}s")

    proc.stdin.close()
    proc.wait()

    print("\n=== Video Rendering & Audio Synthesis Complete! ===")
    out_size = os.path.getsize(output_mp4)
    print(f"Output File: {output_mp4}")
    print(f"Size: {out_size / (1024*1024):.2f} MB")
    print(f"Duration: {final_video_duration:.1f} seconds ({final_video_duration/60:.2f} minutes)")

if __name__ == "__main__":
    main()
