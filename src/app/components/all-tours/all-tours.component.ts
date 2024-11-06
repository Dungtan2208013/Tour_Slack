import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/Cart';
import { CartDetail } from 'src/app/common/CartDetail';
import { Category } from 'src/app/common/Category';
import { Customer } from 'src/app/common/Customer';
import { Favorites } from 'src/app/common/Favorites';
import { Tours } from 'src/app/common/Tours';
import { Rate } from 'src/app/common/Rate';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ToursService } from 'src/app/services/tours.service';
import { RateService } from 'src/app/services/rate.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.css']
})
export class AllToursComponent implements OnInit {

  tours!: Tours[];
  isLoading = true;
  customer!: Customer;
  favorite!: Favorites;
  favorites!: Favorites[];
  categories!: Category[];

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];

  page: number = 1;

  key: string = '';
  keyF: string = '';
  reverse: boolean = true;

  rates!: Rate[];
  countRate!: number;


  constructor(
    private toursService: ToursService,
    private cartService: CartService,
    private customerService: CustomerService,
    private toastr: ToastrService,
    private favoriteService: FavoritesService,
    private sessionService: SessionService,
    private router: Router,
    private rateService: RateService,
    private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.getTours();
    this.getAllRate();
    this.getCategories();
  }

  getAllRate() {
    this.rateService.getAll().subscribe(data => {
      this.rates = data as Rate[];
    })
  }

  getAvgRate(id: number): number {
    let avgRating: number = 0;
    this.countRate = 0;
    for (const item of this.rates) {
      if (item.tours.tourId === id) {
        avgRating += item.rating;
        this.countRate++;
      }
    }
    return Math.round(avgRating/this.countRate * 10) / 10;
  }

  getTours() {
    this.toursService.getAll().subscribe(data => {
      this.isLoading = false;
      this.tours = data as Tours[];
    }, error => {
      this.toastr.error('Lỗi server!', 'Hệ thống');
    })
  }

  getCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data as Category[];
    })
  }

  addCart(tourId: number, price: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.cartService.getCart(email).subscribe(data => {
      this.cart = data as Cart;
      this.cartDetail = new CartDetail(0, 1, price, new Tours (tourId), new Cart(this.cart.cartId));
      this.cartService.postDetail(this.cartDetail).subscribe(data => {
        this.toastr.success('Thêm vào giỏ hàng thành công!', 'Hệ thống!');
        this.cartService.getAllDetail(this.cart.cartId).subscribe(data => {
          this.cartDetails = data as CartDetail[];
          this.cartService.setLength(this.cartDetails.length);
        })
      }, error => {
        this.toastr.error('Sản phẩm này có thể đã hết hàng!', 'Hệ thống');
        this.router.navigate(['/home']);
        window.location.href = "/";
      });
    }, error => {//
      console.error("Lỗi khi lấy giỏ hàng:", error);//
  });//
}//

  toggleLike(id: number) {
    let email = this.sessionService.getUser();
    if (email == null) {
      this.router.navigate(['/sign-form']);
      this.toastr.info('Hãy đăng nhập để sử dụng dịch vụ của chúng tôi', 'Hệ thống');
      return;
    }
    this.favoriteService.getByToursIdAndEmail(id, email).subscribe(data => {
      if (data == null) {
        this.customerService.getByEmail(email).subscribe(data => {
          this.customer = data as Customer;
          this.favoriteService.post(new Favorites(0, new Customer(this.customer.userId), new Tours(id))).subscribe(data => {
            this.toastr.success('Thêm thành công!', 'Hệ thống');
            this.favoriteService.getByEmail(email).subscribe(data => {
              this.favorites = data as Favorites[];
              this.favoriteService.setLength(this.favorites.length);
            }, error => {
              this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
            })
          }, error => {
            this.toastr.error('Thêm thất bại!', 'Hệ thống');
          })
        })
      } else {
        this.favorite = data as Favorites;
        this.favoriteService.delete(this.favorite.favoriteId).subscribe(data => {
          this.toastr.info('Đã xoá ra khỏi danh sách yêu thích!', 'Hệ thống');
          this.favoriteService.getByEmail(email).subscribe(data => {
            this.favorites = data as Favorites[];
            this.favoriteService.setLength(this.favorites.length);
          }, error => {
            this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
          })
        }, error => {
          this.toastr.error('Lỗi!', 'Hệ thống');
        })
      }
    })
  }

  sort(keyF: string) {
    if (keyF === 'enteredDate') {
      this.key = 'enteredDate';
      this.reverse = true;
    } else
      if (keyF === 'priceDesc') {
        this.key = '';
        this.tours.sort((a, b) => b.price - a.price);
      } else
        if (keyF === 'priceAsc') {
          this.key = '';
          this.tours.sort((a, b) => a.price - b.price);
        }
        else {
          this.key = '';
          this.getTours();
        }
  }

}
