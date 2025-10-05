import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './_components/Header';
import BottomNav from './_components/BottomNav';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({children}) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-5xl mx-auto px-4 pb-24 md:pb-10 pt-16">
          {children}
        </main>
        <BottomNav />
      </div>
    </QueryClientProvider>
  );
}
