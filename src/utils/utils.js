import React from 'react';

export default function useResizer() {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 1200);
    function handleSizeChange() {
        return setIsMobile(window.innerWidth < 1140);
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleSizeChange);

        return () => {
            window.removeEventListener('resize', handleSizeChange);
        };
    }, [isMobile]);

    return isMobile;
}
