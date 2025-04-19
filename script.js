document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('download-btn');
    const teraboxUrlInput = document.getElementById('terabox-url');
    const resultContainer = document.querySelector('.result-container');
    const fileNameElement = document.querySelector('.file-name');
    const fileSizeElement = document.querySelector('.file-size');
    const fileTypeElement = document.querySelector('.file-type');
    const progressBar = document.querySelector('.progress');
    const progressText = document.querySelector('.progress-text');
    const directDownloadBtn = document.getElementById('direct-download');
    const downloadLink = document.getElementById('download-link');
    const thumbnail = document.querySelector('.thumbnail i');

    // API endpoint (gunakan layanan gratis seperti terabox-dl atau buat sendiri)
    const API_ENDPOINT = 'https://your-terabox-api-endpoint.com/api/download';
    // API key gratis (jika diperlukan)
    const API_KEY = 'free_api_key_123';

    downloadBtn.addEventListener('click', async function() {
        const teraboxUrl = teraboxUrlInput.value.trim();
        const quality = document.querySelector('input[name="quality"]:checked').value;

        if (!teraboxUrl) {
            alert('Silakan masukkan link TeraBox terlebih dahulu!');
            return;
        }

        try {
            downloadBtn.disabled = true;
            downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';

            // Simulasi pengambilan info file (dalam implementasi nyata, gunakan API)
            simulateFileInfoFetch(teraboxUrl, quality);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat memproses link. Silakan coba lagi.');
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        }
    });

    function simulateFileInfoFetch(url, quality) {
        // Ini hanya simulasi, dalam implementasi nyata gunakan fetch ke API
        setTimeout(() => {
            // Contoh data dummy
            const dummyData = {
                status: 'success',
                data: {
                    filename: 'Contoh File Video.mp4',
                    size: '125 MB',
                    type: 'video/mp4',
                    downloadUrl: '#',
                    thumbnail: 'video' // bisa 'video', 'image', 'document', dll
                }
            };

            displayFileInfo(dummyData.data);
            
            downloadBtn.disabled = false;
            downloadBtn.innerHTML = '<i class="fas fa-download"></i> Download';
        }, 1500);
    }

    function displayFileInfo(fileInfo) {
        // Tampilkan info file
        fileNameElement.textContent = fileInfo.filename;
        fileSizeElement.textContent = `Ukuran: ${fileInfo.size}`;
        fileTypeElement.textContent = `Tipe: ${fileInfo.type.split('/')[1].toUpperCase()}`;
        
        // Set ikon berdasarkan tipe file
        setFileThumbnail(fileInfo.type);
        
        // Set download link
        downloadLink.href = fileInfo.downloadUrl;
        downloadLink.setAttribute('download', fileInfo.filename);
        
        // Tampilkan container hasil
        resultContainer.classList.remove('hidden');
    }

    function setFileThumbnail(fileType) {
        const type = fileType.split('/')[0];
        
        // Hapus semua kelas sebelumnya
        thumbnail.className = 'fas';
        
        switch(type) {
            case 'video':
                thumbnail.classList.add('fa-file-video');
                break;
            case 'image':
                thumbnail.classList.add('fa-file-image');
                break;
            case 'audio':
                thumbnail.classList.add('fa-file-audio');
                break;
            case 'application':
                thumbnail.classList.add('fa-file-pdf');
                break;
            default:
                thumbnail.classList.add('fa-file-alt');
        }
    }

    directDownloadBtn.addEventListener('click', function() {
        // Simulasi proses download
        simulateDownload();
    });

    function simulateDownload() {
        directDownloadBtn.disabled = true;
        directDownloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengunduh...';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            progressText.textContent = `${Math.round(progress)}%`;
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Trigger download sebenarnya
                    downloadLink.click();
                    
                    directDownloadBtn.disabled = false;
                    directDownloadBtn.innerHTML = '<i class="fas fa-check"></i> Download Selesai';
                    setTimeout(() => {
                        directDownloadBtn.innerHTML = '<i class="fas fa-arrow-down"></i> Download Sekarang';
                    }, 2000);
                }, 500);
            }
        }, 300);
    }
});
