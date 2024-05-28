# Audio Visualizer

This project is an audio visualizer that uses the Web Audio API and Canvas API to visualize audio playback. Users can select songs from a playlist and see both time-domain and frequency-domain visualizations.

## Features

- Time-domain and frequency-domain visualizations
- Playlist to select and play different audio files
- Responsive and visually appealing design

## Setup

1. **Run a local server**:

    To ensure the JavaScript runs correctly, you need to serve the files using a local server. You can use Python's built-in HTTP server for this purpose.

    Open a terminal in the project directory and run:

    ```sh
    python -m http.server
    ```

2. **Open your browser**:

    Open your browser and navigate to `http://localhost:8000`. You should see the audio visualizer with the playlist on the right side.

## Usage

- Click on a song in the playlist to start playing it.
- The visualizer will display both time-domain and frequency-domain representations of the audio.

## Infomation
- What's `time-domain` visualization?
  - `Time-Domain` visualization is a way to represent audio signals in the time domain. It shows how the amplitude of the audio signal changes over time. In the context of an audio visualizer, this is often represented as a `waveform` that moves in sync with the audio playback.
- What's `frequency-domain` visualization?
  - `Frequency-Domain` visualization is a way to represent audio signals in the frequency domain. It shows the distribution of frequencies present in the audio signal. In the context of an audio visualizer, this is often represented as a `spectrogram` or `frequency spectrum` that changes based on the audio being played.
