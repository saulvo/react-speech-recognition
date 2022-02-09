import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const [result, setResult] = useState([]);
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    (async () => {
      if (transcript !== '') {
        const keySearch = encodeURIComponent(transcript.trim());
        const { data } = await axios.get(
          `https://api.dienthoaigiakho.vn/api/search?q=${keySearch}&limit=5&offset=0`,
        );
        setResult(data?.rows || []);
      }
    })();
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>{`Browser doesn't support speech recognition.`}</span>;
  }

  return (
    <div className='container'>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={() => SpeechRecognition.startListening()}>Start</button>
      <button onClick={() => SpeechRecognition.stopListening()}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>

      {result.length > 0 && (
        <ul>
          {result.map((prod, idx) => (
            <li key={idx}>
              <img className='photo' src={prod.productPhoto} />
              <p className='name'>{prod.name}</p>
              <p>
                Giá: <span className='price'>{prod.salePrice}</span>
              </p>
            </li>
          ))}
        </ul>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .container {
          width: 300px;
          max-width: 100%;
          margin: 10px auto;
          text-align: center;
        }
        button {
          width: 100%;
          height: 30px;
          margin: 5px;
        }

        ul {
          text-align: left;
          list-style: none;
        }

        ul li {
          border-bottom: 1px solid #eee;
          margin-bottom: 5px;
          padding-bottom: 5px;
        }

        p {
          font-size: 14px;
          margin: 0 0 3px;
        }
        .name {
          font-weight: 500;
        }
        .price {
          color: red;
          font-size: 15px;
        }

        .photo {
          width: 50px;
          height: 50px;
          float: left;
          margin-right: 3px;
        }
      `,
        }}
      />
    </div>
  );
};
export default Dictaphone;
