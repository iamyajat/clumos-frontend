import { JitsiMeeting } from '@jitsi/react-sdk'
import React from 'react'

const VideoCall = (props) => {
    const handleJitsiIFrameRef = (iframeRef) => {
        iframeRef.style.background = '#3f51b5';
        iframeRef.style.height = '85vh';
        iframeRef.style.borderRadius = '10px';
    };
    return (
        <JitsiMeeting
            domain="meet.jit.si"
            roomName={props.roomName}
            // onApiReady={externalApi => { this.api = externalApi }}
            getIFrameRef={handleJitsiIFrameRef}
            userInfo={{ displayName: props.name}}
            configOverwrite={{  // options here: https://github.com/jitsi/jitsi-meet/blob/master/config.js
                enableWelcomePage: true,  // this doesn't seem to be working...
                readOnlyName: true,
                toolbarButtons: ['camera', 'microphone'],
                enableCalendarIntegration: false
            }}
            interfaceConfigOverwrite={{
                SHOW_CHROME_EXTENSION_BANNER: false,
                SHOW_JITSI_WATERMARK: false
            }}
        />
    )
}

export default VideoCall