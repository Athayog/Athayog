import { useEffect } from 'react';
import useThemeStore from '@/store/useThemeStore';

const ScrollListener = () => {
    const setIsScrolled = useThemeStore((state) => state.setIsScrolled);

    useEffect(() => {
        const handleIntersection = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // The element is in view, so reset the scroll state
                    setIsScrolled(false);
                } else {
                    // The element is out of view, so set the scroll state
                    setIsScrolled(true);
                }
            });
        };

        // Create an IntersectionObserver instance
        const observer = new IntersectionObserver(handleIntersection, {
            root: null, // Use the viewport as the root
            rootMargin: '0px', // Adjust margin as needed
            threshold: 0.1, // Trigger when 10% of the element is in view
        });

        // Target the element to observe
        const target = document.getElementById('scroll-target');
        if (target) {
            observer.observe(target);
        }

        // Cleanup observer on component unmount
        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [setIsScrolled]);

    return null;
};

export default ScrollListener;
