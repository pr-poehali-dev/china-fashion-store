import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'clothing' | 'cosmetics';
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: 'Традиционное Ципао',
      price: 8900,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/84b214b9-94bc-4c97-8647-ae29c68f1c18.jpg',
      description: 'Элегантное шёлковое платье с цветочным узором'
    },
    {
      id: 2,
      name: 'Набор для ухода за кожей',
      price: 3200,
      category: 'cosmetics',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/2ae86830-e816-404c-b387-98eb13c73bb8.jpg',
      description: 'Роллер из нефрита и эссенция зелёного чая'
    },
    {
      id: 3,
      name: 'Худи с драконом',
      price: 5400,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/c8becdde-8604-49db-83b5-17eb9daaa59c.jpg',
      description: 'Современная уличная мода с восточными мотивами'
    },
    {
      id: 4,
      name: 'Шёлковая куртка с вышивкой',
      price: 12500,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/69fe2206-405f-4123-96ce-cd8bca44ad11.jpg',
      description: 'Турквоизный жакет с цветочной вышивкой и стоячим воротником'
    },
    {
      id: 5,
      name: 'Бомбер с вышитым драконом',
      price: 9800,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/ae423c6f-8513-4d9c-a1df-da0420a369f4.jpg',
      description: 'Чёрная куртка с красными акцентами в urban-стиле'
    },
    {
      id: 6,
      name: 'Платье Ханьфу',
      price: 7600,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/04e66d90-c3cc-4b7e-ba06-a2630643b61f.jpg',
      description: 'Нежное розово-белое платье из струящегося шёлка'
    },
    {
      id: 7,
      name: 'Травяная маска для лица',
      price: 2450,
      category: 'cosmetics',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/cd678055-f4c6-495d-842b-34b03b2a1afc.jpg',
      description: 'С зелёным чаем и женьшенем для глубокого питания'
    },
    {
      id: 8,
      name: 'Набор помад',
      price: 3800,
      category: 'cosmetics',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/995df1d2-c6ec-4a6a-aee8-7c243047dba3.jpg',
      description: 'Коллекция красных и розовых оттенков в роскошной упаковке'
    },
    {
      id: 9,
      name: 'Маска для сна и крем для глаз',
      price: 4200,
      category: 'cosmetics',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/2d24b37c-091e-4cdb-b120-37fd8bb70138.jpg',
      description: 'Шёлковая маска и восстанавливающий крем с лотосом'
    },
    {
      id: 10,
      name: 'Пиджак Тан',
      price: 11300,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/7d9e3420-fb87-40f5-968c-1f77fed1cf71.jpg',
      description: 'Тёмно-синий пиджак с воротником-мандарин, приталенный крой'
    },
    {
      id: 11,
      name: 'Широкие брюки с узором',
      price: 5900,
      category: 'clothing',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/affcb78c-0ec0-4218-8562-5e13aea966ae.jpg',
      description: 'Палаццо с традиционным принтом облаков'
    },
    {
      id: 12,
      name: 'Кушон с шёлковой пудрой',
      price: 3600,
      category: 'cosmetics',
      image: 'https://cdn.poehali.dev/projects/6bd94170-99c2-4006-a6a4-f385facbf1d1/files/2183f6ee-1150-4b6e-b397-8f650f45031b.jpg',
      description: 'Компактная тональная основа с эффектом сияния'
    }
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const menuItems = [
    { name: 'Главная', href: '#home' },
    { name: 'Одежда', href: '#clothing', category: 'clothing' },
    { name: 'Косметика', href: '#cosmetics', category: 'cosmetics' },
    { name: 'Коллекции', href: '#collections' },
    { name: 'О бренде', href: '#about' },
    { name: 'Контакты', href: '#contacts' },
    { name: 'Доставка', href: '#delivery' },
    { name: 'Блог', href: '#blog' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🏮</div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                东方美学
              </h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.category) {
                      setActiveCategory(item.category);
                    }
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary after:transition-all after:duration-300"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="ShoppingBag" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                <p className="text-lg font-bold text-primary">{item.price} ₽</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  >
                                    <Icon name="Minus" size={14} />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  >
                                    <Icon name="Plus" size={14} />
                                  </Button>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    className="h-7 w-7 ml-auto text-destructive"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-lg font-semibold">Итого:</span>
                          <span className="text-2xl font-bold text-primary">{getTotalPrice()} ₽</span>
                        </div>
                        <Button className="w-full" size="lg">
                          Оформить заказ
                          <Icon name="ArrowRight" size={18} className="ml-2" />
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <section className="relative h-[600px] bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjOWI4N2Y1IiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Восточная
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                элегантность
              </span>
            </h2>
            <p className="text-xl text-foreground/70 mb-8 max-w-xl">
              Откройте для себя уникальную коллекцию современной и традиционной китайской одежды и косметики
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                Смотреть каталог
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 hover:scale-105 transition-transform">
                Узнать больше
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="whitespace-nowrap"
            >
              Все товары
            </Button>
            <Button
              variant={activeCategory === 'clothing' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('clothing')}
              className="whitespace-nowrap"
            >
              <Icon name="Shirt" size={18} className="mr-2" />
              Одежда
            </Button>
            <Button
              variant={activeCategory === 'cosmetics' ? 'default' : 'outline'}
              onClick={() => setActiveCategory('cosmetics')}
              className="whitespace-nowrap"
            >
              <Icon name="Sparkles" size={18} className="mr-2" />
              Косметика
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge 
                      className="absolute top-4 right-4 bg-accent"
                    >
                      {product.category === 'clothing' ? 'Одежда' : 'Косметика'}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        {product.price} ₽
                      </span>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="hover:scale-105 transition-transform"
                      >
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="text-3xl">🏮</div>
                <h3 className="text-xl font-bold">东方美学</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Аутентичная китайская мода и косметика высшего качества
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Одежда</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Косметика</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Коллекции</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Новинки</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О бренде</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Оплата</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@eastbeauty.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  Москва, ул. Примерная, 1
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2024 东方美学. Все права защищены
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;