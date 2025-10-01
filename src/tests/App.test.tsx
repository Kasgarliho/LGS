import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';

// Testlerimizin gerçek veritabanına bağlanmasını veya yerel depolamayı kullanmasını istemeyiz.
// Bu yüzden bu fonksiyonları "taklit" (mock) ediyoruz.
vi.mock('@/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(() => Promise.resolve({ data: {}, error: null })),
      maybeSingle: vi.fn(() => Promise.resolve({ data: null, error: null })),
    })),
    rpc: vi.fn(() => Promise.resolve({ data: [], error: null })),
  }
}));

// localStorage'ı taklit ediyoruz
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });


describe('LGS Asistanı Uygulaması', () => {
  it('Uygulama ilk açıldığında ve kullanıcı giriş yapmamışsa giriş ekranını göstermeli', () => {
    // 1. Adım: App bileşenini sanal ekrana çiz
    render(<App />);
    
    // 2. Adım: Ekranda "Sisteme Giriş" başlığının görünüp görünmediğini kontrol et
    // Bu, giriş modal'ının doğru şekilde açıldığını doğrular.
    const titleElement = screen.getByText('Sisteme Giriş');
    
    // 3. Adım: Sonucu doğrula
    expect(titleElement).toBeInTheDocument();
  });
});