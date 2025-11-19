import { screen } from '@testing-library/react';

import { componentRender } from 'shared/lib/tests/componentRender/componentRender';
import { MetricCard } from './MetricCard';

describe('MetricCard test', () => {
    it('renders title correctly with default props', () => {
        componentRender(<MetricCard />);

        expect(screen.getByText('Metric card title')).toBeInTheDocument();
        expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    it('renders title correctly with custom props', () => {
        componentRender(<MetricCard
            title="New month user"
            value={123}
            maxValue={1000}
            increase="+13%"
        />);

        expect(screen.getByText('New month user')).toBeInTheDocument();
        expect(screen.getByText('123/1000')).toBeInTheDocument();
        expect(screen.getByText('+13%')).toBeInTheDocument();
    });

    it('shows skeleton when loading', () => {
        const { container } = componentRender(<MetricCard loading />);

        const skeleton = container.querySelector('div.Skeleton[style*="width: 340px"][style*="height: 130px"]');

        expect(skeleton).toBeInTheDocument();

        expect(container).toHaveTextContent('');
        expect(screen.queryByText('Metric card title')).not.toBeInTheDocument();
    });


    it('caps progress at 100% and displays correct values when value exceeds maxValue', () => {
        componentRender(<MetricCard title="Users" value={999} maxValue={100} increase="+899%" />);

        expect(screen.getByText('999/100')).toBeInTheDocument();
        expect(screen.getByText('+899%')).toBeInTheDocument();
        expect(screen.getByText('Users')).toBeInTheDocument();

    });
});
