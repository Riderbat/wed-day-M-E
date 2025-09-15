'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock, Heart, Phone, Calendar as CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import Reveal from '@/components/Reveal';

export default function WeddingInvitation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    attendance: '',
    alcohol: '',
    wishes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Спасибо за ваш ответ!');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background image */}
        <Image src="/wending.jpg" alt="" fill priority className="object-cover" />
        <div className="text-center z-20 px-4 text-white">
          <div className="mb-8">
            <Reveal>
              <div className="w-32 h-px bg-white mx-auto mb-8"></div>
              <h1 className="text-8xl md:text-8xl font-light tracking-wider text-white mb-4 font-rightism">
                Егор
              </h1>
              <div className="text-8xl md:text-5xl font-light text-white mb-4 italic">
                &
              </div>
              <h1 className="text-8xl md:text-8xl font-light tracking-wider text-white mb-8 font-rightism">
                Мария
              </h1>
              <div className="w-32 h-px bg-white mx-auto mb-8"></div>
            </Reveal>
          </div>
          
          <Reveal delayMs={100}>
            <div className="text-2xl md:text-3xl font-light text-white mb-12 tracking-widest">
              20 ИЮНЯ 2026
            </div>
          </Reveal>
          
          <Reveal delayMs={200}>
            <Button 
              onClick={() => scrollToSection('invitation')}
              variant="default"
              className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            >
              ЧИТАТЬ ПРИГЛАШЕНИЕ
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Invitation Section */}
      <section id="invitation" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-light text-stone-800 mb-12">
              ДОРОГИЕ ГОСТИ!
            </h2>
          </Reveal>
          
          <Reveal delayMs={100}>
            <div className="prose prose-lg mx-auto text-stone-700 leading-relaxed">
              <p className="text-xl mb-8">
                В нашей жизни есть счастливые и радостные моменты, которые хочется 
                разделить с дорогими людьми.
              </p>
              
              <p className="text-xl mb-8">
                Поэтому мы приглашаем Вас открыть вместе с нами новую страницу книги 
                нашей жизни!
              </p>
              
              <p className="text-xl mb-12">
                <strong>Мы будем искренне рады разделить этот день вместе с Вами!</strong>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="relative py-20 px-4">
        <Image src="/flowwer.jpg" alt="" fill priority className="object-cover" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <Reveal>
            <h2 className="text-4xl font-light mb-4">
              МЫ БУДЕМ ИСКРЕННЕ РАДЫ РАЗДЕЛИТЬ
            </h2>
            <p className="text-xl mb-12 text-white/90">
              ЭТОТ ДЕНЬ ВМЕСТЕ С ВАМИ!
            </p>
          </Reveal>

          <div className="inline-block mx-auto bg-black/60 backdrop-blur-sm rounded-2xl p-6 md:p-8">
            <div className="text-4xl font-light italic mb-6">Июнь</div>
            
            <div className="max-w-md mx-auto mb-6">
              <Reveal>
              <div className="grid grid-cols-7 gap-1 text-center text-white">
              <div className="p-2 text-white/80 font-medium text-xl">ПН</div>
              <div className="p-2 text-white/80 font-medium text-xl">ВТ</div>
              <div className="p-2 text-white/80 font-medium text-xl">СР</div>
              <div className="p-2 text-white/80 font-medium text-xl">ЧТ</div>
              <div className="p-2 text-white/80 font-medium text-xl">ПТ</div>
              <div className="p-2 text-white/80 font-medium text-xl">СБ</div>
              <div className="p-2 text-white/80 font-medium text-xl">ВС</div>
              
              <div className="p-2 text-white/80 text-xl">1</div>
              <div className="p-2 text-white/80 text-xl">2</div>
              <div className="p-2 text-white/80 text-xl">3</div>
              <div className="p-2 text-white/80 text-xl">4</div>
              <div className="p-2 text-white/80 text-xl">5</div>
              <div className="p-2 text-white/80 text-xl">6</div>
              <div className="p-2 text-white/80 text-xl">7</div>
              
              <div className="p-2 text-white/80 text-xl">8</div>
              <div className="p-2 text-white/80 text-xl">9</div>
              <div className="p-2 text-white/80 text-xl">10</div>
              <div className="p-2 text-white/80 text-xl">11</div>
              <div className="p-2 text-white/80 text-xl">12</div>
              <div className="p-2 text-white/80 text-xl">13</div>
              <div className="p-2 text-white/80 text-xl">14</div>
              
              <div className="p-2 text-white/80 text-xl">15</div>
              <div className="p-2 text-white/80 text-xl">16</div>
              <div className="p-2 text-white/80 text-xl">17</div>
              <div className="p-2 text-white/80 text-xl">18</div>
              <div className="p-2 text-white/80 text-xl">19</div>
              <div className="relative p-2">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-10 h-10 text-primary fill-current" />
                </div>
                <div className="text-white font-bold relative z-10 text-2xl">20</div>
              </div>
              <div className="p-2 text-white/80 text-xl">21</div>
              
              <div className="p-2 text-white/80 text-xl">22</div>
              <div className="p-2 text-white/80 text-xl">23</div>
              <div className="p-2 text-white/80 text-xl">24</div>
              <div className="p-2 text-white/80 text-xl">25</div>
              <div className="p-2 text-white/80 text-xl">26</div>
              <div className="p-2 text-white/80 text-xl">27</div>
              <div className="p-2 text-white/80 text-xl">28</div>
              
                <div className="p-2 text-white/80 text-xl">29</div>
                <div className="p-2 text-white/80 text-xl">30</div>
              </div>
              </Reveal>
            </div>
            
            <div className="text-2xl font-light text-white text-center">
              20.06.2026
            </div>
          </div>
        </div>
      </section>

      {/* Dress Code Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Reveal>
              <h2 className="text-4xl font-light text-stone-800 mb-8">
                КРАСИВО И БУДЕМ РАДЫ, ЕСЛИ В СВОИХ
              </h2>
              <p className="text-xl text-stone-600 mb-12">
                НАРЯДАХ ВЫ ПОДДЕРЖИТЕ ЦВЕТОВУЮ ГАММУ НАШЕЙ СВАДЬБЫ
              </p>
            </Reveal>
            
            {/* Color Palette */}
            <Reveal delayMs={100}>
              <div className="flex justify-center gap-4 mb-16">
                <div className="w-16 h-16 rounded-full bg-primary"></div>
                <div className="w-16 h-16 rounded-full bg-secondary"></div>
                <div className="w-16 h-16 rounded-full bg-white border"></div>
                <div className="w-16 h-16 rounded-full bg-primary/70"></div>
                <div className="w-16 h-16 rounded-full bg-secondary/70"></div>
              </div>
            </Reveal>
          </div>
          
          {/* Outfit Examples */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Reveal>
              <div className="text-center">
                <h3 className="text-2xl font-light text-stone-800 mb-8">Для дам</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="aspect-[3/4] bg-stone-200 rounded-lg"></div>
                  <div className="aspect-[3/4] bg-stone-300 rounded-lg"></div>
                  <div className="aspect-[3/4] bg-stone-400 rounded-lg"></div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delayMs={100}>
              <div className="text-center">
                <h3 className="text-2xl font-light text-stone-800 mb-8">Для мужчин</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="aspect-[3/4] bg-stone-200 rounded-lg"></div>
                  <div className="aspect-[3/4] bg-stone-300 rounded-lg"></div>
                  <div className="aspect-[3/4] bg-stone-400 rounded-lg"></div>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="text-center">
            <Reveal>
              <h2 className="text-4xl font-light text-stone-800 mb-8">ПОЖЕЛАНИЯ</h2>
              <p className="text-xl text-stone-600 mb-4">
                ВАШЕ ПРИСУТСТВИЕ И ИСКРЕННИЕ СЛОВА — ЛУЧШИЙ ПОДАРОК ДЛЯ НАС!
              </p>
              <div className="flex justify-center gap-2">
                <Heart className="w-6 h-6 text-primary fill-current" />
                <Heart className="w-6 h-6 text-secondary fill-current" />
                <Heart className="w-6 h-6 text-primary fill-current" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Venue & Timing Section */}
      <section className="py-20 px-4 bg-stone-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Venue Info */}
            <Reveal>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8 text-center">
                  <h3 className="text-3xl font-light text-stone-800 mb-6">БАНКЕТ</h3>
                  <div className="mb-6">
                    <MapPin className="w-8 h-8 mx-auto mb-4 text-stone-600" />
                    <p className="text-lg text-stone-700 mb-2">
                      НАША СВАДЬБА ПРОЙДЕТ
                    </p>
                    <p className="text-lg font-medium text-stone-800 mb-2">
                      ПАРК-ОТЕЛЬ "ЦИТАДЕЛЬ"
                    </p>
                    <p className="text-stone-600">
                      ПО АДРЕСУ: УЛ. ПОБЕДЫ, 19
                    </p>
                  </div>
                  <Button variant="default" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    ОТКРЫТЬ КАРТУ
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            
            {/* Timing */}
            <Reveal delayMs={100}>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-light text-stone-800 mb-8 text-center">ТАЙМИНГ</h3>
                  
                  <div className="space-y-8">
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mr-6">
                        <Clock className="w-8 h-8 text-stone-600" />
                      </div>
                      <div>
                        <div className="text-2xl font-light text-stone-800">15:00</div>
                        <div className="text-stone-600">Сбор гостей</div>
                        <div className="text-sm text-stone-500">Встреча и регистрация гостей</div>
                      </div>
                    </div>
                    
                    <div className="w-px h-8 bg-stone-300 ml-8"></div>
                    
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mr-6">
                        <Heart className="w-8 h-8 text-secondary fill-current" />
                      </div>
                      <div>
                        <div className="text-2xl font-light text-stone-800">15:30</div>
                        <div className="text-stone-600">Выездная церемония</div>
                        <div className="text-sm text-stone-500">Официальная церемония бракосочетания</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RSVP Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <Reveal>
              <p className="text-lg text-stone-600 mb-4">
                ОТВЕТИТ НА ВСЕ ВАШИ ВОПРОСЫ
              </p>
              <p className="text-2xl font-light text-stone-800 mb-8">
                +79081547451
              </p>
              
              <h2 className="text-4xl font-light text-stone-800 mb-8">АНКЕТА</h2>
              
              <div className="prose prose-lg mx-auto text-stone-700 mb-12">
                <p>ПОЖАЛУЙСТА ЗАПОЛНИТЕ АНКЕТУ, НАМ ЭТО ПОМОЖЕТ СДЕЛАТЬ НАШ ДЕНЬ ЛУЧШЕ!</p>
                <p className="text-sm">ТАКЖЕ ПРОСИМ ГОСТЕЙ, КОТОРЫЕ ПРИДУТ В ПАРЕ, ЗАПОЛНИТЬ АНКЕТУ ПО ОТДЕЛЬНОСТИ.</p>
              </div>
            </Reveal>
          </div>
          
          <Reveal>
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-stone-700 font-medium">ВАШЕ ИМЯ И ФАМИЛИЯ?</Label>
                  <Input 
                    id="name"
                    placeholder="Введите имя"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-2 border-stone-300 focus:border-stone-500"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-stone-700 font-medium">ВАШ ТЕЛЕФОН</Label>
                  <div className="relative mt-2">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center">
                      <span className="w-6 h-4 bg-white border border-gray-300 mr-2"></span>
                      <span className="text-stone-600">+7</span>
                    </div>
                    <Input 
                      id="phone"
                      placeholder="(999) 999-99-99"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="pl-20 border-stone-300 focus:border-stone-500"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="text-stone-700 font-medium">ПОДТВЕРДИТЕ ВАШЕ ПРИСУТСТВИЕ</Label>
                  <RadioGroup 
                    value={formData.attendance} 
                    onValueChange={(value) => setFormData({...formData, attendance: value})}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes" className="text-stone-600">Обязательно буду</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="text-stone-600">К сожалению, не смогу присутствовать</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no" className="text-stone-600">На данный момент не знаю, напишу в личку</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="alcohol" className="text-stone-700 font-medium">КАКОЙ АЛКОГОЛЬ ПРЕДПОЧИТАЕТЕ?</Label>
                  <Select value={formData.alcohol} onValueChange={(value) => setFormData({...formData, alcohol: value})}>
                    <SelectTrigger className="mt-2 border-stone-300 focus:border-stone-500">
                      <SelectValue placeholder="Выберите предпочтение" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wine">Вино</SelectItem>
                      <SelectItem value="champagne">Шампанское</SelectItem>
                      <SelectItem value="vodka">Водка</SelectItem>
                      <SelectItem value="whiskey">Виски</SelectItem>
                      <SelectItem value="beer">Пиво</SelectItem>
                      <SelectItem value="cocktails">Коктейли</SelectItem>
                      <SelectItem value="none">Не употребляю алкоголь</SelectItem>
                      <SelectItem value="any">Любой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="wishes" className="text-stone-700 font-medium">ПОЖЕЛАНИЯ ИЛИ КОММЕНТАРИИ</Label>
                  <Textarea 
                    id="wishes"
                    placeholder="Ваши пожелания..."
                    value={formData.wishes}
                    onChange={(e) => setFormData({...formData, wishes: e.target.value})}
                    className="mt-2 border-stone-300 focus:border-stone-500 min-h-[100px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-stone-800 hover:bg-stone-700 text-white py-3 text-lg font-light transition-colors duration-300"
                >
                  ОТПРАВИТЬ ОТВЕТ
                </Button>
              </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-stone-900 text-center">
        <Reveal>
          <div className="text-stone-400 mb-4">
            <Heart className="w-6 h-6 mx-auto mb-2 fill-current" />
            <p>ЕГОР И МАРИЯ</p>
            <p className="text-sm">20 ИЮНЯ 2026</p>
          </div>
        </Reveal>
      </footer>
    </div>
  );
}