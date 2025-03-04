document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      { id: 1, name: "Ayam Bakar", img: "ayam-bakar.jpg", price: 15000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
      { id: 2, name: "Ayam Goreng", img: "ayam-goreng.jpg", price: 13000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
      { id: 3, name: "Ayam Kari", img: "ayam-kari.jpg", price: 13000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
      { id: 4, name: "Ayam Teriyaki", img: "teriyaki.jpg", price: 15000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
      { id: 5, name: "Es Teh", img: "es-teh.jpg", price: 5000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
      { id: 6, name: "Nasi", img: "nasi.jpg", price: 3000, description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima, quasi quis nulla nisi rem quidem amet voluptates soluta sapiente, temporibus et corrupti. Quo, tempore aspernatur?' },
    ],
    
  }));

  Alpine.store('cart', {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
        //check apakah ada barang yang sama
        const cartItem = this.items.find((item) => item.id === newItem.id);

        //jika belum ada / masih kosong
        if (!cartItem) {
            this.items.push({...newItem, quantity: 1, total: newItem.price});
            this.quantity++;
            this.total += newItem.price;
            
        } else {
            //jika barang sudah ada check apakah barang beda atau sama
            this.items = this.items.map((item) => {
                //jika barang beda
                if (item.id !== newItem.id) {
                    return item;
                } else {
                //jika barang sudah ada
                    item.quantity++;
                    item.total = item.price * item.quantity;
                    this.quantity++;
                    this.total += item.price;
                    return item;
                }
            });
        }
    },
    remove(id) {
        //ambil item yang mau diremove by id
        const cartItem = this.items.find((item) => item.id);

        //jika item lebih dari 1
        if (cartItem.quantity > 1) {
            //telusuri satu/satu
            this.items = this.items.map((item) => {
                //jika bukan barang diklik
                if(item.id !== id) {
                    return item;
                } else {
                    item.quantity--;
                    item.total = item.price * item.quantity;
                    this.quantity--;
                    this.total -= item.price;
                    return item;
                }
            })
        } else if(cartItem.quantity === 1) {
            //tika barang sisa 1
            this.items = this.items.filter((item) => item.id !== id);
            this.quantity--;
            this.total -= cartItem.price;
        }
    }

  });
});

//konfersi ke rupiah

const rupiah = (number) => {
    return new Intl.NumberFormat( 'id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};
