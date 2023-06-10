
document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("upload-button");
    const videoFileInput = document.getElementById("video-file");
    const uploadStatusDiv = document.getElementById("upload-status");

    uploadButton.addEventListener("click", () => {
        const file = videoFileInput.files[0];
        if (file) {
            uploadVideo(file);
        } else {
            alert("Please select a video file to upload.");
        }
    });

    function uploadVideo(file) {
        const formData = new FormData();
        formData.append("file", file);

        const url = "https://livepeer.studio/api/asset/request-upload";

        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const uploadStatus = `Video uploaded successfully! CID: ${data.cid}`;
                uploadStatusDiv.innerText = uploadStatus;
            })
            .catch(error => {
                console.error("Error uploading video:", error);
                uploadStatusDiv.innerText = "An error occurred while uploading the video.";
            });
    }
});
