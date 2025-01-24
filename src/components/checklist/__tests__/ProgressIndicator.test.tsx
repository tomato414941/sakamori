import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressIndicator from '../ProgressIndicator';

describe('ProgressIndicator', () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const types = ['bar', 'circle'] as const;

    test.each(types)('renders %s type correctly', (type) => {
        render(<ProgressIndicator completed={50} total={100} type={type} />);
        const percentage = screen.getByText('50%');
        expect(percentage).toBeInTheDocument();
    });

    test.each(sizes)('applies correct size class for %s size in bar type', (size) => {
        const { container } = render(
            <ProgressIndicator completed={50} total={100} type="bar" size={size} />
        );
        const bar = container.firstChild as HTMLElement;
        const sizeClasses = {
            small: 'h-1.5',
            medium: 'h-2',
            large: 'h-3'
        };
        expect(bar.className).toContain(sizeClasses[size]);
    });

    test('calculates percentage correctly', () => {
        render(<ProgressIndicator completed={75} total={100} />);
        expect(screen.getByText('75%')).toBeInTheDocument();
    });

    test('rounds percentage to nearest integer', () => {
        render(<ProgressIndicator completed={33.33} total={100} />);
        expect(screen.getByText('33%')).toBeInTheDocument();
    });

    test('hides percentage when showPercentage is false', () => {
        render(<ProgressIndicator completed={50} total={100} showPercentage={false} />);
        expect(screen.queryByText('50%')).not.toBeInTheDocument();
    });

    test('applies custom className', () => {
        const customClass = 'custom-test-class';
        const { container } = render(
            <ProgressIndicator completed={50} total={100} className={customClass} />
        );
        expect(container.firstChild).toHaveClass(customClass);
    });

    test('handles zero total gracefully', () => {
        render(<ProgressIndicator completed={0} total={0} />);
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    test('handles completed greater than total gracefully', () => {
        render(<ProgressIndicator completed={150} total={100} />);
        expect(screen.getByText('100%')).toBeInTheDocument();
    });
});
