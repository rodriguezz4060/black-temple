import { ScrollArea, ScrollBar } from '@root/components/ui/scroll-area';

export const TalentsEditor = () => {
  return (
    <div className='relative flex h-[540px] w-full justify-center'>
      {/* Фоновое изображение */}
      <div className="absolute inset-0 bg-[url('https://assets-ng.maxroll.gg/wow/talents/talents-background-paladin-retribution.webp')] bg-cover bg-right opacity-100 brightness-100 md:bg-center"></div>

      {/* Контейнер с iframe */}
      <ScrollArea className='w-full whitespace-nowrap'>
        <div
          style={{ colorScheme: 'light' }}
          className='relative z-20 flex h-full items-center justify-center'
        >
          <iframe
            src='https://www.raidbots.com/simbot/render/talents/CUkAAAAAAAAAAAAAAAAAAAAAAAAGjZmZMmZkZmxYYMbzMYsNjZegZMzwMjZGbjZYGMAAAAALziZMMbaagZmZYbD?locale=ru_RU&width=900&level=80&theme=light&bgcolor=transparent'
            width='900'
            height='540'
            title='Talents Editor'
            className='overflow-hidden'
          />
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
};
