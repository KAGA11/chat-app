import React, { useRef, useEffect, useState } from 'react';


// 懒加载 用户实际滚动到图片所在的消息时才加载图片
const LazyLoadImage = ({ src, alt, className }) => {
  const imgRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // 一旦图片加载，就不再观察
          }
        });
      },
      { threshold: 0.1 } // 当图片进入视口 10% 时加载
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ''}
      alt={alt}
      className={className}
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease-in' }} // 提供一个淡入效果
    />
  );
};

export default LazyLoadImage;
