import React from 'react';


/**
 *
 *
 * @param {*} initialIsVisible
 * @return {*} 
 * Using
 * const { ref, isComponentVisible } = useComponentVisible(true);
 * <div ref={ref}>Text</div>
 */
function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    React.useState(initialIsVisible);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log('out');
      setIsComponentVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}

export { useComponentVisible };


