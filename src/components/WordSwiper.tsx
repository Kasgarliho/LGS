import React, { useState, useEffect, useMemo, useCallback } from 'react';
import TinderCard from 'react-tinder-card';
import { dailyWords } from '@/data/dailywords';
import { storage } from '@/utils/storage';
import { ThumbsUp, ThumbsDown, Zap, Repeat, Lock, Award } from 'lucide-react';
import { playSwipeSound } from '@/utils/sounds';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/pages/AppLayout";
import { LearnedWords } from '@/types';

const WordSwiper: React.FC = () => {
  // === DÜZELTME 1: Başlangıç state'i boş olarak ayarlandı ===
  const [learned, setLearned] = useState<LearnedWords>({ known: [], unknown: [] });
  const [mode, setMode] = useState<'learn' | 'review'>('learn');
  const [wordIndex, setWordIndex] = useState(-1);
  const [isFlipped, setIsFlipped] = useState(false);
  
  // === DÜZELTME 2: Gerekli bilgiler ve userId context'ten alınıyor ===
  const { userId, isMuted, handleEnglishUnitUnlocked } = useAppContext();

  // === DÜZELTME 3: Veri yükleme işlemi artık useEffect içinde ve userId'ye bağlı yapılıyor ===
  useEffect(() => {
    if (userId) {
      setLearned(storage.loadLearnedWords(userId));
    }
  }, [userId]);

  const unlockedUnits = useMemo(() => {
    if (!userId) return [1];
    const units = [...new Set(dailyWords.map(w => w.unit))].sort((a, b) => a - b);
    let unlocked = [1];
    for (let i = 1; i < units.length; i++) {
      const previousUnit = units[i-1];
      const wordsInPreviousUnit = dailyWords.filter(w => w.unit === previousUnit);
      if (wordsInPreviousUnit.length === 0) continue;
      
      const knownWordsCount = wordsInPreviousUnit.filter(w => learned.known.includes(w.id)).length;
      const progress = (knownWordsCount / wordsInPreviousUnit.length) * 100;
      
      if (progress >= 90) {
        if (!unlocked.includes(units[i])) {
          handleEnglishUnitUnlocked();
        }
        unlocked.push(units[i]);
      } else {
        break;
      }
    }
    return unlocked;
  }, [learned.known, handleEnglishUnitUnlocked, userId]);

  const deck = useMemo(() => {
    if (!userId) return [];
    const wordsFromUnlockedUnits = dailyWords.filter(word => unlockedUnits.includes(word.unit));
    if (mode === 'review') {
      return wordsFromUnlockedUnits.filter(word => learned.unknown.includes(word.id));
    }
    const seenWords = new Set([...learned.known, ...learned.unknown]);
    return wordsFromUnlockedUnits.filter(word => !seenWords.has(word.id));
  }, [mode, learned, unlockedUnits, userId]);

  useEffect(() => {
    setWordIndex(deck.length - 1);
    setIsFlipped(false);
  }, [deck]);

  // === DÜZELTME 4: Kaydetme işlemi (storage.saveLearnedWords) artık userId ile yapılıyor ===
  const swiped = useCallback((direction: 'up' | 'down' | 'left' | 'right', wordId: string) => {
    if (!userId) return; // Kullanıcı yoksa işlem yapma

    playSwipeSound(isMuted);
    
    setLearned(prev => {
      let updated: LearnedWords = { ...prev };
      if (direction === 'up') {
        updated.known = [...new Set([...prev.known, wordId])];
        updated.unknown = prev.unknown.filter(id => id !== wordId);
      } else if (direction === 'down') {
        updated.unknown = [...new Set([...prev.unknown, wordId])];
        updated.known = prev.known.filter(id => id !== wordId);
      }
      storage.saveLearnedWords(userId, updated); // userId eklendi
      return updated;
    });

    setIsFlipped(false);
    setWordIndex(prevIndex => prevIndex - 1);
  }, [isMuted, userId]); // userId bağımlılıklara eklendi

  const currentWord = deck[wordIndex];

  const renderEmptyState = () => {
    const nextUnit = unlockedUnits.length > 0 ? unlockedUnits[unlockedUnits.length - 1] + 1 : 2;
    const isNextUnitLocked = dailyWords.some(w => w.unit === nextUnit);
    
    if (mode === 'learn' && wordIndex < 0 && isNextUnitLocked) {
        const wordsInCurrentUnit = dailyWords.filter(w => w.unit === unlockedUnits[unlockedUnits.length - 1]);
        const knownInCurrentUnit = wordsInCurrentUnit.filter(w => learned.known.includes(w.id));
        const progress = wordsInCurrentUnit.length > 0 ? Math.round((knownInCurrentUnit.length / wordsInCurrentUnit.length) * 100) : 0;
        return (
            <div className="text-center p-4">
                 <Lock className="w-10 h-10 mx-auto text-muted-foreground mb-2"/>
                 <h3 className="text-lg font-semibold text-foreground mb-2">
                   Ünite {nextUnit} Kilitli
                 </h3>
                 <p className="text-muted-foreground text-sm mb-3">
                   Yeni üniteyi açmak için mevcut ünitede %90 başarıya ulaşmalısın.
                 </p>
                 <div className="w-full bg-muted rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{width: `${progress}%`}}></div>
                 </div>
                 <p className="text-xs text-muted-foreground mt-1">İlerlemen: %{progress}</p>
            </div>
        )
    }
    return (
        <div className="text-center p-4">
             <Award className="w-10 h-10 mx-auto text-green-500 mb-2"/>
             <h3 className="text-lg font-semibold text-foreground mb-2">Harika İş!</h3>
             <p className="text-muted-foreground text-sm">
               {mode === 'learn' ? 'Tüm açık kelimeleri tamamladın.' : 'Tekrar edilecek kelime kalmadı.'}
             </p>
        </div>
    )
  };

  const wordData = dailyWords.find(w => w.id === currentWord?.id);
  
  return (
    <Card className="bg-card shadow-card rounded-2xl p-4 flex flex-col items-center border border-border/50 dark:border-white/10">
      <div className="w-full flex justify-center items-center mb-4">
        <div className="flex items-center bg-muted/40 p-1 rounded-lg">
          <button onClick={() => setMode('learn')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center gap-2 ${mode === 'learn' ? 'bg-card shadow text-primary' : 'text-muted-foreground'}`}><Zap size={16}/>Öğren</button>
          <button onClick={() => setMode('review')} className={`px-3 py-1 text-sm font-semibold rounded-md flex items-center gap-2 ${mode === 'review' ? 'bg-card shadow text-primary' : 'text-muted-foreground'}`}><Repeat size={16}/>Tekrar Et</button>
        </div>
      </div>
      
      <p className="text-center text-sm text-muted-foreground mb-4">Biliyorsan yukarı, bilmiyorsan aşağı kaydır.</p>

      <div className="relative w-full h-48 mb-4">
        {currentWord ? (
          <TinderCard 
            key={currentWord.id} 
            onSwipe={(dir) => swiped(dir, currentWord.id)} 
            preventSwipe={['left', 'right']} 
            className="absolute w-full h-full"
          >
            <div 
              className={`relative w-full h-full rounded-xl shadow-lg transition-transform duration-500 cursor-pointer`} 
              style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
              onClick={() => setIsFlipped(prev => !prev)}
            >
              <div className="absolute inset-0 w-full h-full bg-sky-500 text-white flex flex-col items-center justify-center rounded-xl p-4 text-center" style={{ backfaceVisibility: 'hidden' }}>
                <p className="text-2xl font-bold capitalize notranslate" translate="no">{currentWord.word}</p>
              </div>
              <div className="absolute inset-0 w-full h-full bg-indigo-500 text-white flex flex-col items-center justify-center rounded-xl p-4 text-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                <p className="text-lg font-bold capitalize mb-2">{wordData?.meaning}</p>
                <p className="text-sm italic opacity-90">"{wordData?.example}"</p>
                <p className="text-xs mt-1 italic opacity-70">
                  {wordData?.exampleMeaning}
                </p>
              </div>
            </div>
          </TinderCard>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/40 rounded-xl p-4">
             {renderEmptyState()}
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center text-gray-500 dark:text-gray-400 gap-2">
        <div className="flex items-center">
            <ThumbsUp className="w-5 h-5 mr-2 text-green-500"/>
            <span>Biliyorum</span>
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex items-center">
            <ThumbsDown className="w-5 h-5 mr-2 text-red-500"/>
            <span>Bilmiyorum</span>
        </div>
      </div>
      
      {currentWord && (
        <Button 
          onClick={() => setIsFlipped(prev => !prev)} 
          className="mt-4 px-4 py-2 text-sm font-semibold rounded-lg"
          variant="outline"
        >
          {isFlipped ? "Kelimeyi Gizle" : "Anlamı Gör"}
        </Button>
      )}
    </Card>
  );
};

export default WordSwiper;