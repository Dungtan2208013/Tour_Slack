// import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/common/Cart';
import { CartDetail } from 'src/app/common/CartDetail';
import { Customer } from 'src/app/common/Customer';
import { Favorites } from 'src/app/common/Favorites';
import { Tour } from 'src/app/common/Tour';
import { Rate } from 'src/app/common/Rate';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { TourService } from 'src/app/services/tour.service';
import { RateService } from 'src/app/services/rate.service';
import { SessionService } from 'src/app/services/session.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tours-detail',
  templateUrl: './tours-detail.component.html',
  styleUrls: ['./tours-detail.component.css']
})
export class ToursDetailComponent implements OnInit {

  @ViewChild('galleryModal') galleryModal!: ElementRef;

  // Phương thức để mở gallery
  openGallery(): void {
    this.galleryModal.nativeElement.style.display = 'flex';
  }
  // Phương thức để đóng gallery
  closeGallery(): void {
    this.galleryModal.nativeElement.style.display = 'none';
  }
  // ------datetime------\
  
  startDate!: string;
  endDate!: string;
  numberofTour!: number;
  // -------------
  tour!: Tour;
  tours!: Tour[];
  id!: number;

  isLoading = true;

  customer!: Customer;
  favorite!: Favorites;
  favorites!: Favorites[];
  totalLike!: number;

  cart!: Cart;
  cartDetail!: CartDetail;
  cartDetails!: CartDetail[];

  rates!: Rate[];
  rateAll!: Rate[];
  countRate!: number;

  itemsComment: number = 3;
  today: string = '';

  constructor(
    private TourService: TourService,
    private modalService: NgbModal,
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private favoriteService: FavoritesService,
    private sessionService: SessionService,
    private rateService: RateService) {
    route.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  slideConfig = { "slidesToShow": 7, "slidesToScroll": 2, "autoplay": true };
  // --------

  // ----------
  ngOnInit(): void {
    // ------
    const current = new Date();
    const year = current.getFullYear();
    const month = String(current.getMonth() + 1).padStart(2, '0');
    const day = String(current.getDate()).padStart(2, '0');
    
    this.today = `${year}-${month}-${day}`;
    this.startDate = this.today; // Optionally set startDate to today by default
    this.modalService.dismissAll();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
    this.id = this.route.snapshot.params['id'];
    this.getTours();
    this.getRates();
    this.getTotalLike();
    this.getAllRate();
  }

  setItemsComment(size: number) {
    this.getTours();
    this.getRates();
    this.getTotalLike();
    this.getAllRate();
    this.itemsComment = size;
    console.log(this.itemsComment);

  }
  onStartDateChange() {
    if (this.startDate) {
      const start = new Date(this.startDate); // Chuyển startDate thành đối tượng Date
      start.setDate(start.getDate() + this.tour.duration); // Thêm duration vào ngày startDate

      const year = start.getFullYear();
      const month = String(start.getMonth() + 1).padStart(2, '0'); // Lấy tháng (cộng thêm 1 vì tháng trong Date bắt đầu từ 0)
      const day = String(start.getDate()).padStart(2, '0'); // Lấy ngày

      this.endDate = `${year}-${month}-${day}`; // Cập nhật endDate với định dạng yyyy-mm-dd
    }
  }
  addCarts(tourId: any): void {
    const dataTour = {
      startDate: this.startDate,
      endDate: this.endDate,
      numberofTour: this.numberofTour,
    };
    this.TourService.getOne(tourId).subscribe(tourToAdd => {
      if (tourToAdd) {
        // Lấy dữ liệu hiện tại từ localStorage và chuyển thành mảng nếu có, ngược lại tạo mảng rỗng
        const localStorageData = JSON.parse(localStorage.getItem('cart') || '[]');
        let currentCart: any[] = localStorageData;

        // Tạo đối tượng mới chứa cả tour và dataTour
        const cartItem = {
          ...tourToAdd,
          dataTour
        };

        // Thêm đối tượng mới vào giỏ hàng
        currentCart.push(cartItem);

        // Lưu giỏ hàng đã cập nhật trở lại localStorage
        localStorage.setItem('cart', JSON.stringify(currentCart));
      }
    });
    this.router.navigate(['/cart']);
  }

  // addCarts(tourId: any): void {
  //   const dataTour = {
  //     startDate: this.startDate,
  //     endDate: this.endDate,
  //     numberofTour: this.numberofTour,
  //   };

  //   this.ToursService.getOne(tourId).subscribe(tourToAdd => {
  //     if (tourToAdd) {
  //       // Kiểm tra và lấy dữ liệu hiện có trong localStorage cho cả tours và dataTours
  //       const localStorageData = JSON.parse(localStorage.getItem('cart') || '{}');
  //       let tours: any[] = localStorageData.tours || [];
  //       let dataTours: any[] = localStorageData.dataTours || [];

  //       // Thêm tour mới vào mảng tours và dataTour vào mảng dataTours
  //       tours.push(tourToAdd);
  //       dataTours.push(dataTour);

  //       // Lưu lại cả hai mảng trong localStorage dưới key 'cart'
  //       localStorage.setItem('cart', JSON.stringify({ tours, dataTours }));
  //     }
  //   });

  //   this.router.navigate(['/cart']);
  // }

  getTours() {
    this.TourService.getOne(this.id).subscribe(tourToAdd => {
      this.isLoading = false;
      this.tour = tourToAdd as Tour;
      this.TourService.getSuggest(this.tour.category.categoryId, this.tour.tourId).subscribe(data => {
        this.tours = data as Tour[];
        console.log("asdasd");
      })
      console.log("asdasd");
    }, error => {
      this.toastr.error('Sản phẩm không tồn tại!', 'Hệ thống');
      this.router.navigate(['/home'])
    })
  }

  getRates() {
    this.rateService.getByTours(this.id).subscribe(data => {
      this.rates = data as Rate[];
    }, error => {
      this.toastr.error('Lỗi hệ thống!', 'Hệ thống');
    })
  }

  getAllRate() {
    this.rateService.getAll().subscribe(data => {
      this.rateAll = data as Rate[];
    })
  }

  getAvgRate(id: number): number {
    let avgRating: number = 0;
    this.countRate = 0;
    for (const item of this.rateAll) {
      if (item.tour.tourId === id) {
        avgRating += item.rating;
        this.countRate++;
      }
    }
    return this.countRate == 0 ? 0 : Math.round(avgRating / this.countRate * 10) / 10;
  }

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
          this.favoriteService.post(new Favorites(0, new Customer(this.customer.userId), new Tour(id))).subscribe(data => {
            this.toastr.success('Thêm thành công!', 'Hệ thống');
            this.favoriteService.getByEmail(email).subscribe(data => {
              this.favorites = data as Favorites[];
              this.favoriteService.setLength(this.favorites.length);
              this.getTotalLike();
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
            this.getTotalLike();
          }, error => {
            this.toastr.error('Lỗi truy xuất dữ liệu!', 'Hệ thống');
          })
        }, error => {
          this.toastr.error('Lỗi!', 'Hệ thống');
        })
      }
    })
  }

  getTotalLike() {
    this.favoriteService.getByTours(this.id).subscribe(data => {
      this.totalLike = data as number;
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
      this.cartDetail = new CartDetail(0, 1, price, new Tour(tourId), new Cart(this.cart.cartId));
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
      })
    })
  }

}
