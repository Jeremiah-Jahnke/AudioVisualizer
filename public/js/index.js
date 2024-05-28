window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    const canvasCtx = canvas.getContext("2d");
    const playlist = document.getElementById("playlist");
    const audio = document.getElementById("audio");
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(audio);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const drawTimeDomain = () => {
        requestAnimationFrame(drawTimeDomain);
        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(0, 0, canvas.width / 2, canvas.height);
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.font = "16px Arial";
        canvasCtx.fillText("Time Domain", 10, 20);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(255, 255, 255)";
        canvasCtx.beginPath();

        const sliceWidth = (canvas.width / bufferLength) * 2;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0;
            const y = (v * canvas.height) / 2;

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(canvas.width / 2, canvas.height / 2);
        canvasCtx.stroke();
    };

    const drawFrequencyDomain = () => {
        requestAnimationFrame(drawFrequencyDomain);
        analyser.getByteFrequencyData(dataArray);

        canvasCtx.fillStyle = "rgb(0, 0, 0)";
        canvasCtx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);
        canvasCtx.fillStyle = "#ffffff";
        canvasCtx.fillText("Frequency Domain", canvas.width / 2 + 10, 20);

        const barWidth = (canvas.width / 2 / bufferLength) * 2.5;
        let x = canvas.width / 2;

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i];

            canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
            canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

            x += barWidth + 1;
        }
    };

    drawTimeDomain();
    drawFrequencyDomain();

    playlist.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const selectedSong = event.target.getAttribute("data-src");
            if (audio.src !== selectedSong) {
                audio.src = selectedSong;
                audio.play();
            }
        }
    });
});
