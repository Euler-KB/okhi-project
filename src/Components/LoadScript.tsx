import React, {useEffect, useState} from 'react';

type LoadScriptProps = {
    id: string;
    async: boolean;
    url: string;
    onLoaded(): void;
    children?: any;
};

const LoadScript : React.FC<LoadScriptProps> = ({ id, url , async , onLoaded , children } : LoadScriptProps)  : React.ReactElement => {

    const [isLoaded,setLoaded] = useState(false);

    useEffect(() => {

        if(isLoaded)
            return;

        const existingScript = window.document.getElementById(id);
        let script : HTMLScriptElement;
        if(!existingScript){
            script = window.document.createElement('script');
            script.async = async;
            script.id = id;
            script.src = url;
            script.onload = () => {
                if(onLoaded)onLoaded();
                setLoaded(true);
            }

            window.document.head.appendChild(script);
        }

        return () => {

          if(script)
              document.head.removeChild(script);
        };

    },[]);

    return children;
};

export default LoadScript;
