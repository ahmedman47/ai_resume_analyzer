export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    if (typeof window === "undefined") {
        throw new Error("PDF conversion is only available in the browser");
    }

    isLoading = true;
    // @ts-expect-error - dynamic import for ESM bundle
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then((lib) => {
        // Ensure the worker file is resolved correctly in both dev and prod
        // Use the worker from the installed pdfjs-dist package to avoid version mismatches
        const workerUrl = new URL("pdfjs-dist/build/pdf.worker.mjs", import.meta.url).toString();
        lib.GlobalWorkerOptions.workerSrc = workerUrl;
        pdfjsLib = lib;
        isLoading = false;
        return lib;
    });

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });
        if (typeof document === "undefined") {
            throw new Error("Document not available");
        }
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (!context) {
            throw new Error("Failed to acquire 2D context for canvas");
        }
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";

        await page.render({ canvasContext: context, viewport }).promise;

        return new Promise((resolve) => {
            // Use toBlob when available; otherwise fallback to dataURL
            if (typeof canvas.toBlob === "function") {
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const originalName = file.name.replace(/\.pdf$/i, "");
                            const imageFile = new File([blob], `${originalName}.png`, {
                                type: "image/png",
                            });
                            resolve({ imageUrl: URL.createObjectURL(blob), file: imageFile });
                        } else {
                            // Fallback to dataURL if blob creation failed
                            try {
                                const dataUrl = canvas.toDataURL("image/png", 1.0);
                                const res = fetch(dataUrl)
                                    .then(r => r.blob())
                                    .then((b) => {
                                        const originalName = file.name.replace(/\.pdf$/i, "");
                                        const imageFile = new File([b], `${originalName}.png`, { type: "image/png" });
                                        resolve({ imageUrl: dataUrl, file: imageFile });
                                    })
                                    .catch(() => {
                                        resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
                                    });
                            } catch (e) {
                                resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
                            }
                        }
                    },
                    "image/png",
                    1.0
                );
            } else {
                try {
                    const dataUrl = canvas.toDataURL("image/png", 1.0);
                    fetch(dataUrl)
                        .then(r => r.blob())
                        .then((b) => {
                            const originalName = file.name.replace(/\.pdf$/i, "");
                            const imageFile = new File([b], `${originalName}.png`, { type: "image/png" });
                            resolve({ imageUrl: dataUrl, file: imageFile });
                        })
                        .catch(() => {
                            resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
                        });
                } catch (e) {
                    resolve({ imageUrl: "", file: null, error: "Failed to create image blob" });
                }
            }
        });
    } catch (err) {
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${err}`,
        };
    }
}