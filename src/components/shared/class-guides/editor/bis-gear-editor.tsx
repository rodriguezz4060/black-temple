'use client';

import { BisGearProps } from '@root/@types/prisma';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@root/components/ui/dialog';
import Image from 'next/image';
import ItemFetcher from '../../blizzard/item-fetcher';
import { Button } from '@root/components/ui/button';
import { useState } from 'react';
import { X } from 'lucide-react';
import { TooltipWrapper } from '../../wrapper';

interface BisGearEditorProps {
  overviewGear: BisGearProps | null;
  gearCover: string;
  spec: string;
  characterClass: string;
  classColor: string;
  gameMode: string;
}

interface Socket {
  id: string;
  img: string;
  name: string;
  url: string;
}

interface ItemEditState {
  name: string;
  img: string;
  url: string;
  sockets: Socket[];
  enchantImg: string | null;
  enchantName: string | null;
  enchantUrl: string | null;
}

export const BisGearEditor = ({
  overviewGear,
  spec,
  characterClass,
  classColor,
  gameMode,
  gearCover,
}: BisGearEditorProps) => {
  const [itemState, setItemState] = useState<ItemEditState>({
    name: overviewGear?.headName || '',
    img: overviewGear?.headImg || '',
    url: '',
    sockets:
      overviewGear?.headSockets.map(socket => ({
        id: String(socket.id),
        img: socket.img || '',
        name: socket.name || '',
        url: socket.link || '',
      })) || [],
    enchantImg: overviewGear?.headEnchantImg || null,
    enchantName: null,
    enchantUrl: overviewGear?.headEnchantUrl || null,
  });
  const [isAddingSocket, setIsAddingSocket] = useState(false);

  const handleItemFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      name: data.name,
      img: data.icon,
      url: data.url,
    }));
  };

  const handleSocketFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      sockets: [
        ...prev.sockets,
        {
          id: `socket-${Date.now()}`,
          img: data.icon,
          name: data.name,
          url: data.url,
        },
      ],
    }));
    setIsAddingSocket(false);
  };

  const handleEnchantFetched = (data: {
    name: string;
    icon: string;
    url: string;
  }) => {
    setItemState(prev => ({
      ...prev,
      enchantImg: data.icon,
      enchantName: data.name,
      enchantUrl: data.url,
    }));
  };

  const handleAddSocket = () => {
    setIsAddingSocket(true);
  };

  const handleCancelSocket = () => {
    setIsAddingSocket(false);
  };

  const handleRemoveSocket = (id: string) => {
    setItemState(prev => ({
      ...prev,
      sockets: prev.sockets.filter(socket => socket.id !== id),
    }));
  };

  const handleSave = () => {
    const dataForDB = {
      head: {
        name: itemState.name,
        img: itemState.img,
        url: itemState.url,
        sockets: itemState.sockets.map(socket => ({
          name: socket.name,
          img: socket.img,
          url: socket.url,
        })),
        enchantImg: itemState.enchantImg,
        enchantName: itemState.enchantName,
        enchantUrl: itemState.enchantUrl,
      },
    };
    console.log('Данные для БД:', dataForDB);
    // Здесь можно отправить dataForDB на сервер через API
    // Например: await saveGearData(dataForDB);
  };

  return (
    <div className='w-full grow-[1] md:flex-1 md:grow-[1]'>
      <figure className='embed relative mx-auto table text-center'>
        <div className='flex w-full origin-[top]! flex-col p-0'>
          <div className='h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin]'>
            <div className='inline-block'>
              <div className='m-0 box-border border-0 p-0 [vertical-align:initial] text-inherit [text-decoration:none]'>
                <div className='relative h-[500px] w-[340px]'>
                  <div className='absolute inset-0 grayscale-50'>
                    <Image
                      src={gearCover}
                      alt={`${spec} ${characterClass} ${gameMode}`}
                      width={340}
                      height={500}
                      className=''
                    />
                  </div>
                  {/*Left Column*/}
                  <div className='absolute top-2.5 left-2.5 flex flex-col gap-1.5'>
                    {/*Head*/}
                    <div className="relative h-[1em] w-[1em] cursor-pointer bg-[url('/assets/slots.png')] bg-[size:auto_1em] bg-[position:0em] text-[48px]">
                      <Dialog>
                        <DialogTrigger asChild>
                          <div
                            className='icon-after absolute inset-0 m-[0_0.2em_-0.1em_0] inline-block h-[1em] w-[1em] bg-[size:100%] bg-[position:50%] bg-no-repeat'
                            style={{
                              backgroundImage: `url(${itemState.img})`,
                            }}
                          >
                            <div className='absolute -top-0.5 left-[52px] w-[106px] cursor-default text-left text-[12px] font-bold'>
                              <div className='text-multi-shadow line-clamp-2 h-[2.4em] leading-[1.2em]'>
                                <span className='text-[#a335ee]'>
                                  {itemState.name}
                                </span>
                              </div>
                              <div className='flex flex-row items-center gap-0.5'>
                                {itemState.sockets.map(socket => (
                                  <div
                                    key={socket.id}
                                    className='h-[1em] w-[1em] cursor-pointer border-[2px] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                                    style={{
                                      backgroundImage: `url(${socket.img})`,
                                    }}
                                  ></div>
                                ))}
                                {itemState.enchantImg && (
                                  <div
                                    className='h-[1em] w-[1em] cursor-pointer border-[2px] bg-[size:1em] bg-[position:-2px_-2px] text-[20px]'
                                    style={{
                                      backgroundImage: `url(${itemState.enchantImg})`,
                                    }}
                                  ></div>
                                )}
                              </div>
                            </div>
                          </div>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                          <DialogHeader>
                            <DialogTitle>Редактировать Шлем</DialogTitle>
                          </DialogHeader>
                          <div className='flex gap-2 rounded border p-4'>
                            <Image
                              src={itemState.img || '/placeholder.png'}
                              alt={itemState.name || 'Шлем'}
                              className='h-16 w-16 border-2 border-black'
                              width={48}
                              height={48}
                            />
                            <div className='flex h-16 flex-col justify-between'>
                              <span className='text-[14px] font-semibold'>
                                {itemState.name}
                              </span>
                              <div className='flex flex-row items-center gap-0.5'>
                                {itemState.sockets.map(socket => (
                                  <div
                                    key={socket.id}
                                    className='h-5 w-5 cursor-pointer border border-black bg-cover bg-center'
                                    style={{
                                      backgroundImage: `url(${socket.img})`,
                                    }}
                                  ></div>
                                ))}
                                {itemState.enchantImg && (
                                  <div
                                    className='h-5 w-5 cursor-pointer border border-black bg-cover bg-center'
                                    style={{
                                      backgroundImage: `url(${itemState.enchantImg})`,
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <ItemFetcher onItemFetched={handleItemFetched} />
                          <span className='ml-2 text-[18px] font-semibold'>
                            Сокеты
                          </span>
                          <div className='flex flex-wrap gap-3'>
                            {itemState.sockets.map(socket => (
                              <div
                                key={socket.id}
                                className='relative border p-2'
                              >
                                <Image
                                  src={socket.img || '/placeholder.png'}
                                  alt='Сокет'
                                  width={34}
                                  height={34}
                                  className='border-2 border-black'
                                />
                                <Button
                                  onClick={() => handleRemoveSocket(socket.id)}
                                  className='absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full p-0.5 hover:bg-red-600'
                                  aria-label='Удалить сокет'
                                >
                                  <X className='h-4 w-4' />
                                </Button>
                              </div>
                            ))}
                          </div>
                          {isAddingSocket ? (
                            <div className='mt-2'>
                              <ItemFetcher
                                onItemFetched={handleSocketFetched}
                              />
                              <div className='mt-2 flex gap-2'>
                                <Button
                                  variant='outline'
                                  onClick={handleCancelSocket}
                                >
                                  Отмена
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button onClick={handleAddSocket}>
                              Добавить сокет
                            </Button>
                          )}

                          <div>
                            <span className='ml-2 text-[18px] font-semibold'>
                              Зачарование
                            </span>
                            <div className='mt-2 mb-2 flex'>
                              <div className='border p-2'>
                                <Image
                                  src={
                                    itemState.enchantImg || '/placeholder.png'
                                  }
                                  alt='Инчант'
                                  width={34}
                                  height={34}
                                  className='border-2 border-black'
                                />
                              </div>
                            </div>
                            <ItemFetcher onItemFetched={handleEnchantFetched} />
                          </div>

                          <DialogFooter>
                            <Button onClick={handleSave}>
                              Сохранить изменения
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    {/*Neck и другие слоты можно добавить аналогично*/}
                  </div>
                  {/*Right Column*/}
                  <div className='absolute top-2.5 right-2.5 flex flex-col gap-1.5'></div>
                  {/*Middle*/}
                  <div className='absolute bottom-2.5 left-[50%] flex translate-x-[-50%] flex-row gap-1.5'></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <figcaption className='font-title my-2 text-center text-sm'>
          <strong style={{ color: classColor }}>
            {characterClass} {spec}
          </strong>{' '}
          Лучшие слоты для {gameMode}
        </figcaption>
      </figure>
    </div>
  );
};
