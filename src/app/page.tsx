import { AppLayout } from '@/components/layout/AppLayout';

export default function Home() {
  return (
    <AppLayout>
      <div className="p-6 h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">BentoBoxer</h1>
          <p className="text-muted-foreground">Grid Editor will be implemented in Phase 3</p>
        </div>
      </div>
    </AppLayout>
  );
}
