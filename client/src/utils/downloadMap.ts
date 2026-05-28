
export const downloadMap = (container: HTMLDivElement | null,
    fileName: string
) => {
    const svgMap = container?.querySelector("svg");
    if (!svgMap) return;

    const svgString = new XMLSerializer().serializeToString(svgMap);
    const svgDataBase64 = btoa(unescape(encodeURIComponent(svgString)));
    const svgDataUrl = `data:image/svg+xml;charset=utf-8;base64,${svgDataBase64}`;

    const image = new Image();

    image.onload = () => {
        const canvas = document.createElement("canvas");
        const width = 1000;
        const height = 600;

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");
        if (!context) return;

        context.fillStyle = "white";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);

        const pngUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = fileName;
        link.click();
    };
    image.src = svgDataUrl;
};
