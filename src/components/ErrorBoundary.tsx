import React from 'react';

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Unexpected application error', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[linear-gradient(135deg,#f7f4ff_0%,#ffffff_55%,#fff8ea_100%)] px-4 py-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-[0_32px_90px_-48px_rgba(49,11,130,0.45)] md:min-h-[28rem]">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-2xl font-black text-white">
              ن
            </div>
            <h1 className="mt-6 text-3xl font-black text-slate-950 md:text-5xl">
              حدث خطأ غير متوقع
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              Something unexpected happened. Please try reloading the page or return to the home page and continue browsing NawaEduTech.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-4 text-sm font-black text-white transition hover:bg-primary"
              >
                العودة إلى الرئيسية
              </a>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-4 text-sm font-black text-slate-700 transition hover:border-primary/20 hover:text-primary"
              >
                Reload page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
