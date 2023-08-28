import React, { useEffect, useRef, useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import './record.css';

const RecordComponent = () => {
  const [recordingType, setRecordingType] = useState('all');

  return (
    <div className='heading_div'>
      <h1 className='headings'>Universal Recorder</h1>
      <h2 className='headings'>Select and Start recording</h2>
      <div className='buttons_div'>
        <button className="btn btn-primary" onClick={() => setRecordingType('video')}>Record WebCam</button>
        <button className="btn btn-primary" onClick={() => setRecordingType('screen')}>Record Screen</button>
        <button className="btn btn-primary" onClick={() => setRecordingType('audio')}>Record Audio</button>
      </div>
      <RecordingSection recordingType={recordingType} />
    </div>
  );
};

const RecordingSection = ({ recordingType}) => {
  const [mediaVisible, setMediaVisible] = useState(true);
  const mediaRef = useRef(null);
  const [mediaBlob, setMediaBlob] = useState(null); // Initialize mediaBlobUrl to null
  
  const handleMediaClose = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0; 
    }
    setMediaVisible(false);
  };

  const handleUpload = async () => {
    if (!mediaBlob) { // Use mediaBlob instead of MediaBlobUrl
      alert('No media to upload.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/getPresignedUrl');
      const presignedUrl = response.data.url;

      const formData = new FormData();
      formData.append('file', mediaBlob);

      await axios.put(presignedUrl, formData, {
        headers: {
          'Content-Type': mediaBlob.type,
          'x-amz-acl': 'public-read',
        },
      });

      alert('Media uploaded successfully');
    } catch (error) {
      console.error('Error uploading media:', error);
      alert('Failed to upload media');
    }
  };

  const ElementStyle={
    videoCss:{
        display: mediaVisible ? 'block' : 'none' ,
        margin: '2% 0 1% 30%',
        border:'1px solid transparent',
        borderRadius:'10px',
        width:'45%',
       

    },
    audioCss:{
        display: mediaVisible ? 'block' : 'none' ,
    }
}
  
  return (
    <div>
      <ReactMediaRecorder
        video={recordingType === 'video'}
        screen={recordingType === 'screen'}
        audio={recordingType === 'audio'}
        render={({ startRecording, stopRecording, mediaBlobUrl, status }) => (
          <div>
            {status === 'idle' && (
              <button className="btn btn-success startRecordingBtn" onClick={startRecording}>Start Recording</button>
            )}
            {status === 'recording' && (
              <button className="btn btn-danger startRecordingBtn" onClick={() => {stopRecording(); }}>Stop Recording</button>
            )}
            {mediaBlobUrl !== null && setMediaBlob(mediaBlobUrl)}
            {mediaBlobUrl && (
              <>
                <div>
                  {mediaVisible && (
                    <div className='buttonCss'>
                       <button className="btn btn-dark uploadButton" onClick={handleUpload}>Upload Media</button>
                       <button className="btn btn-dark closeButton" onClick={handleMediaClose}>X</button>
                    </div>
                  )}
                  {recordingType !== 'audio' && (
                    <video style={ElementStyle.videoCss} ref={mediaRef} src={mediaBlobUrl} controls autoPlay loop />
                  )}
                  {recordingType === 'audio' && (
                    <div className='audioCss'>
                      <audio style={ElementStyle.audioCss} ref={mediaRef} controls autoPlay loop>
                        <source src={mediaBlobUrl} type="audio/wav" />
                      </audio>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      />
   
    </div>
  );
};

export default RecordComponent;
