/* sellIn => número de días que tenemos para vender un artículo
   quality => Calidad del artículo
   Al final de cada día, nuestro sistema decrementa ambos valores para cada artículo mediante el método `updateQuality`

*/

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (const item of this.items) {
      // Verificar si el artículo es "Conjured"
      const isConjured = item.name === 'Conjured';
      // Determinar de degradación
      const degrade = isConjured ? 2 : 1;

      // Reglas para artículos normales
      if (item.name !== 'Aged Brie' && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.quality > 0 && item.name !== 'Sulfuras, Hand of Ragnaros') {
          item.quality -= 1 * degrade;
        }
      } else {
        // Reglas para "Aged Brie" y "Backstage passes"
        if (item.quality < 50) {
          item.quality += 1;

          if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.sellIn < 11 && item.quality < 50) {
              item.quality += 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
              item.quality += 1;
            }
          }
        }
      }

      // Reducción de días para vender si no es "Sulfuras, Hand of Ragnaros"
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }
      
      // Reglas adicionales para artículos vencidos
      if (item.sellIn < 0) {
        if (item.name !== 'Aged Brie') {
          if (item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (item.quality > 0 && item.name !== 'Sulfuras, Hand of Ragnaros') {
              item.quality -= 1 * degrade;
            }
          } else {
            // Calidad cae a 0 para "Backstage passes" vencidos
            item.quality = 0;
          }
        } else {
          // Incrementar la calidad para "Aged Brie" vencido
          if (item.quality < 50) {
            item.quality += 1;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
};
