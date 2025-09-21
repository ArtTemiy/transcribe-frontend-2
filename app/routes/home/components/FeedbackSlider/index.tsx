import React from 'react';

export interface FeedbackSliderProps {
    children?: React.ReactNode;
    className?: string;
}

export const FeedbackSlider: React.FC<FeedbackSliderProps> = ({ children, className = '' }) => (
    <div className={`feedback-slider ${className}`}>{children}</div>
);

export default FeedbackSlider;
