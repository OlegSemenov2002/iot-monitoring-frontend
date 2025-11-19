// import { screen, waitFor, within } from '@testing-library/react';
// import { renderWithProviders } from 'shared/lib/tests/renderWithProviders';
// import MainPage from './MainPage';
// import { server } from 'mocks/server';
// import { rest } from 'msw';
//
// // Мокаем все хуки, которые используются внутри
// jest.mock('features/GetAllMetric/lib/useGetAllMetrics');
// jest.mock('features/AlarmsChart');
// jest.mock('features/AlarmsRecent');
//
// describe('MainPage', () => {
//     // Базовые успешные данные
//     const mockMetrics = {
//         getMetric: jest.fn(),
//         isLoading: false,
//     };
//     const mockChart = { chartData: [...моковые данные для графика...], isLoading: false };
//     const mockRecent = { recentAlarms: [...5–10 моковых тревог...], isLoadingAlarms: false };
//
//     beforeEach(() => {
//         (useGetAllMetrics as jest.Mock).mockReturnValue(mockMetrics);
//         (useAlarmsChartData as jest.Mock).mockReturnValue(mockChart);
//         (useRecentAlarms as jest.Mock).mockReturnValue(mockRecent);
//
//         mockMetrics.getMetric.mockImplementation((type) => {
//             if (type === METRIC_TYPE.NewMonthUsers) return 42;
//             if (type === METRIC_TYPE.NotificationsLastMonth) return 8750;
//             return 0;
//         });
//     });
//
//     // 1. Рендерится без падений + отображаются метрики
//     it('renders dashboard with metric cards', () => {
//         renderWithProviders(<MainPage />);
//
//         expect(screen.getByText(/new clients \(this month\)/i)).toBeInTheDocument();
//         expect(screen.getByText('42')).toBeInTheDocument(); // new users
//         expect(screen.getByText('8 750')).toBeInTheDocument(); // notifications
//         expect(screen.getByText(/notifications per device/i)).toBeInTheDocument();
//         expect(screen.getByText(/последние уведомления/i)).toBeInTheDocument();
//     });
//
//     // 2. Показывает скелетоны во время загрузки
//     it('shows skeletons while loading', () => {
//         (useGetAllMetrics as jest.Mock).mockReturnValue({ ...mockMetrics, isLoading: true });
//         (useAlarmsChartData as jest.Mock).mockReturnValue({ ...mockChart, isLoading: true });
//
//         renderWithProviders(<MainPage />);
//
//         // MetricCard внутри рендерит Skeleton, когда loading=true
//         expect(screen.getAllByTestId('skeleton')).toHaveLength(2); // или сколько там скелетонов
//     });
//
//     // 3. Корректно передаёт данные в MetricChartCard и ScrollableRecentList
//     it('passes correct data to child components', () => {
//         renderWithProviders(<MainPage />);
//
//         const chartCard = screen.getByTestId('metric-chart-card'); // добавь data-testid в MetricChartCard
//         const recentList = screen.getByTestId('scrollable-recent-list');
//
//         // проверяем, что внутри списка есть Device X
//         50    expect(within(recentList).getByText(/Device 1/i)).toBeInTheDocument();
//     });
//
//     // 4. Изменение диапазона дат вызывает хук с новыми параметрами
//     it('updates chart range when user changes date range', async () => {
//         const setChartRange = jest.fn();
//         (useAlarmsChartData as jest.Mock).mockReturnValue({
//             chartData: [],
//             isLoading: false,
//         });
//
//         // Нужно замокать MetricChartCard так, чтобы он вызывал onRangeChange
//         // Лучше всего вынести DateRangePicker в отдельный компонент или добавить data-testid
//         renderWithProviders(<MainPage />);
//
//         // Пример: кликаем на предустановленную кнопку "Last 7 days" внутри MetricChartCard
//         fireEvent.click(screen.getByText(/last 7 days/i));
//
//         await waitFor(() => {
//             expect(useAlarmsChartData).toHaveBeenCalledWith(
//                 expect.objectContaining({
//                     range: expect.objectContaining({ from: expect.any(String) }),
//                 })
//             );
//         });
//     });
//
//     // 5. Ошибки API (опционально, но очень желательно для pet-проекта)
//     it('shows error state when metrics fail', () => {
//         (useGetAllMetrics as jest.Mock).mockReturnValue({
//             getMetric: () => { throw new Error('Network error'); },
//             isLoading: false,
//         });
//
//         renderWithProviders(<MainPage />);
//         // Ожидаем либо fallback UI, либо MetricCard с value="-" или 0
//         expect(screen.getByText('-')).toBeInTheDocument();
//     });
// });
