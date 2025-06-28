import { AppLayout } from '@/components/layout/AppLayout';
import { GridEditor } from '@/features/grid-editor/components/GridEditor';

export default function Home() {
  return (
    <AppLayout>
      <GridEditor />
    </AppLayout>
  );
}
