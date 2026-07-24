
/* ---------- shared product / blog data ---------- */
const products = [
  {tag:'Focus', grad:'linear-gradient(150deg,#DCE6C8,#B9C9A6)', cat:'Ceremonial Grade', name:'Matcha Mộc Châu Cổ Điển', desc:'Vị umami đậm, hậu ngọt thanh — lý tưởng cho buổi sáng tập trung.', price:'285.000₫'},
  {tag:'Energy', grad:'linear-gradient(150deg,#F3E3C2,#D9AE6C)', cat:'Đặc tuyển', name:'Matcha Genki Boost', desc:'Kết hợp matcha và nhân sâm nhẹ — năng lượng bền vững.', price:'320.000₫'},
  {tag:'Calm', grad:'linear-gradient(150deg,#E4D9E8,#C9B8D6)', cat:'Đêm thư giãn', name:'Matcha Lavender Calm', desc:'Hoà quyện oải hương dịu nhẹ — làm chậm nhịp sống.', price:'305.000₫'},
  {tag:'Beauty', grad:'linear-gradient(150deg,#F0D8DC,#E0AEB6)', cat:'Chăm sóc da', name:'Matcha Glow Collagen', desc:'Bổ sung collagen thuỷ phân — làn da căng mướt.', price:'349.000₫'},
  {tag:'Immunity', grad:'linear-gradient(150deg,#D8E8DC,#A8C9B0)', cat:'Đề kháng', name:'Matcha Immune Shield', desc:'Bổ sung vitamin C tự nhiên — tăng cường đề kháng.', price:'315.000₫'},
  {tag:'Focus', grad:'linear-gradient(150deg,#DCE6C8,#B9C9A6)', cat:'Ceremonial Grade', name:'Matcha Zen Morning', desc:'Dòng nhẹ nhàng cho người mới bắt đầu uống matcha.', price:'265.000₫'},
  {tag:'Energy', grad:'linear-gradient(150deg,#F3E3C2,#D9AE6C)', cat:'Đặc tuyển', name:'Matcha Citrus Spark', desc:'Hương cam quýt tươi mát, đánh thức năng lượng.', price:'298.000₫'},
  {tag:'Beauty', grad:'linear-gradient(150deg,#F0D8DC,#E0AEB6)', cat:'Chăm sóc da', name:'Matcha Rose Radiance', desc:'Chiết xuất hoa hồng — nuôi dưỡng làn da từ bên trong.', price:'339.000₫'},
];
function prodCard(p){
  return `<div class="prod-card" data-nav="product-detail">
    <div class="prod-photo" style="background:${p.grad}"><span class="tag">${p.tag}</span>
      <svg width="60" height="60" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="16" stroke="#26402A" stroke-width="1.3"/></svg>
    </div>
    <div class="prod-body">
      <div class="cat-label">${p.cat}</div><h3>${p.name}</h3>
      <p style="font-size:12.5px;color:#5b6b57;margin-bottom:10px;">${p.desc}</p>
      <div class="prod-foot"><span class="price">${p.price}</span>
        <button class="add-btn" onclick="event.stopPropagation()"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#26402A" stroke-width="2.2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></button>
      </div>
    </div></div>`;
}
if(document.getElementById('home-products')) document.getElementById('home-products').innerHTML = products.slice(0,4).map(prodCard).join('');
if(document.getElementById('shop-products')) document.getElementById('shop-products').innerHTML = products.map(prodCard).join('');
if(document.getElementById('related-products')) document.getElementById('related-products').innerHTML = products.slice(4,8).map(prodCard).join('');

const blogs = [
  {date:'18 Th7, 2026', title:'Vì sao Matcha Mộc Châu khác biệt so với matcha Nhật Bản?', desc:'Khám phá thổ nhưỡng và quy trình xay đá truyền thống.', grad:'linear-gradient(160deg,#DCE6C8,#8FAE6C)'},
  {date:'10 Th7, 2026', title:'Nghi thức pha matcha buổi sáng giúp bạn tập trung cả ngày', desc:'Ba bước đơn giản với chasen và chawan.', grad:'linear-gradient(160deg,#F3E3C2,#D9AE6C)'},
  {date:'2 Th7, 2026', title:'5 công dụng của matcha bạn có thể chưa biết', desc:'Từ Focus đến Immunity — lợi ích khoa học của trà xanh.', grad:'linear-gradient(160deg,#E4D9E8,#C9B8D6)'},
  {date:'24 Th6, 2026', title:'Phân biệt Ceremonial Grade và Culinary Grade', desc:'Loại nào phù hợp để uống, loại nào để làm bánh?', grad:'linear-gradient(160deg,#D8E8DC,#A8C9B0)'},
  {date:'15 Th6, 2026', title:'Bảo quản matcha đúng cách để giữ trọn hương vị', desc:'Những sai lầm phổ biến khiến matcha nhanh mất vị.', grad:'linear-gradient(160deg,#F0D8DC,#E0AEB6)'},
  {date:'5 Th6, 2026', title:'Matcha latte tại nhà: công thức chuẩn quán', desc:'Tỷ lệ đánh bột và sữa để có lớp bọt mịn hoàn hảo.', grad:'linear-gradient(160deg,#DCE6C8,#B9C9A6)'},
];
function blogCard(b){
  return `<div class="blog-card" data-nav="blog-detail">
    <div class="blog-photo" style="background:${b.grad}"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#26402A" stroke-width="1.4"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></div>
    <div class="date">${b.date}</div><h3>${b.title}</h3><p>${b.desc}</p></div>`;
}
if(document.getElementById('home-blog')) document.getElementById('home-blog').innerHTML = blogs.slice(0,3).map(blogCard).join('');
if(document.getElementById('blog-list')) document.getElementById('blog-list').innerHTML = blogs.map(blogCard).join('');
if(document.getElementById('blog-related')) document.getElementById('blog-related').innerHTML = blogs.slice(1,4).map(blogCard).join('');

const goals = [
  {k:'Focus',v:'Tập trung',svg:'<circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>'},
  {k:'Energy',v:'Năng lượng',svg:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'},
  {k:'Calm',v:'Thư giãn',svg:'<path d="M12 3c-4 3-6 6-6 10a6 6 0 0012 0c0-4-2-7-6-10z"/>'},
  {k:'Beauty',v:'Sắc đẹp',svg:'<path d="M12 21s-7-4.5-9.3-9C1.2 8.6 3 5 6.5 5c2 0 3.3 1.2 4 2.3.7-1.1 2-2.3 4-2.3 3.5 0 5.3 3.6 3.8 7C19.2 16.5 12 21 12 21z"/>'},
  {k:'Immunity',v:'Miễn dịch',svg:'<path d="M12 2 4 6v6c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/>'},
];
if(document.getElementById('goal-grid')) document.getElementById('goal-grid').innerHTML = goals.map((g,i)=>`
  <div class="goal-card${i===0?' selected':''}" onclick="document.querySelectorAll('.goal-card').forEach(c=>c.classList.remove('selected'));this.classList.add('selected')">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#B98B3E" stroke-width="1.6">${g.svg}</svg>
    <h4>${g.v}</h4>
  </div>`).join('');

/* ---------- admin table data ---------- */
if(document.getElementById('admin-products-tbody')) document.getElementById('admin-products-tbody').innerHTML = products.map(p=>`
  <tr><td><div class="table-thumb" style="background:${p.grad}"></div></td><td>${p.name}</td><td>${p.tag}</td><td>${p.price}</td><td>${Math.floor(Math.random()*80)+20}</td>
  <td><span class="status-pill status-done">Đang bán</span></td>
  <td><div class="row-actions"><button>✎</button><button class="del">🗑</button></div></td></tr>`).join('');

const cats = [
  ['Focus','Sản phẩm hỗ trợ tập trung',3],['Energy','Sản phẩm tăng năng lượng',2],
  ['Calm','Sản phẩm giúp thư giãn',1],['Beauty','Sản phẩm chăm sóc sắc đẹp',2],['Immunity','Sản phẩm tăng đề kháng',1],
];
if(document.getElementById('admin-categories-tbody')) document.getElementById('admin-categories-tbody').innerHTML = cats.map(c=>`
  <tr><td><b>${c[0]}</b></td><td>${c[1]}</td><td>${c[2]}</td>
  <td><div class="row-actions"><button>✎</button><button class="del">🗑</button></div></td></tr>`).join('');

const orderStatuses = [['Chờ xác nhận','status-pending'],['Đã xác nhận','status-confirmed'],['Đang giao','status-shipping'],['Đã giao','status-done']];
const orderNames = ['Anh Vũ','Minh Thư','Quốc Bảo','Ngọc Hà','Thanh Tùng','Hải Yến'];
let ordersHtml='';
for(let i=0;i<6;i++){
  const s=orderStatuses[i%4];
  ordersHtml+=`<tr><td><b>#GA-10${42-i}</b></td><td>${orderNames[i]}</td><td>${20-i}/07/2026</td><td>${(3-i%3)*250+300}.000₫</td>
  <td><span class="status-pill ${s[1]}">${s[0]}</span></td><td><a class="btn-ghost" style="font-size:12.5px;">Xem chi tiết</a></td></tr>`;
}
if(document.getElementById('admin-orders-tbody')) document.getElementById('admin-orders-tbody').innerHTML = ordersHtml;

const custEmails=['anh.vu','minh.thu','quoc.bao','ngoc.ha','thanh.tung','hai.yen'];
let custHtml='';
for(let i=0;i<6;i++){
  custHtml+=`<tr><td><b>${orderNames[i]}</b></td><td>${custEmails[i]}@email.com</td><td>09${i}1 234 5${i}6</td><td>${6-i}</td><td>${10+i*3}/0${(i%6)+1}/2026</td>
  <td><div class="row-actions"><button>👁</button></div></td></tr>`;
}
if(document.getElementById('admin-customers-tbody')) document.getElementById('admin-customers-tbody').innerHTML = custHtml;

if(document.getElementById('admin-blogs-tbody')) document.getElementById('admin-blogs-tbody').innerHTML = blogs.map((b,i)=>`
  <tr><td><div class="table-thumb" style="background:${b.grad}"></div></td><td>${b.title}</td><td>${b.date}</td>
  <td><span class="status-pill ${i<4?'status-done':'status-pending'}">${i<4?'Đã đăng':'Nháp'}</span></td>
  <td><div class="row-actions"><button>✎</button><button class="del">🗑</button></div></td></tr>`).join('');

/* ---------- account tabs ---------- */
document.querySelectorAll('.acct-tab[data-tab]').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.acct-tab[data-tab]').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.acct-panel').forEach(p=>p.style.display='none');
    document.querySelector('.acct-panel[data-panel="'+tab.dataset.tab+'"]').style.display='block';
  });
});

/* ---------- modals ---------- */
function openModal(id){document.getElementById(id).classList.add('show');}
function closeModal(id){document.getElementById(id).classList.remove('show');}


/* ---------- page file map (multi-file navigation) ---------- */
const pageFileMap = {
  'home':'index.html','shop':'shop.html','product-detail':'product-detail.html','cart':'cart.html',
  'login':'login.html','register':'register.html','account':'account.html','checkout':'checkout.html',
  'blog':'blog.html','blog-detail':'blog-detail.html','about':'about.html','contact':'contact.html','finder':'finder.html',
  'admin-login':'admin/login.html','admin-dashboard':'admin/dashboard.html','admin-products':'admin/products.html',
  'admin-categories':'admin/categories.html','admin-orders':'admin/orders.html','admin-customers':'admin/customers.html','admin-blogs':'admin/blogs.html'
};
function navigate(pageId){
  const target = pageFileMap[pageId];
  if(!target) return;
  const inAdminFolder = window.location.pathname.includes('/admin/');
  if(inAdminFolder){
    window.location.href = target.startsWith('admin/') ? target.replace('admin/','') : '../' + target;
  } else {
    window.location.href = target;
  }
}
document.addEventListener('click', function(e){
  const el = e.target.closest('[data-nav]');
  if(el){ e.preventDefault(); navigate(el.dataset.nav); }
});

/* ---------- account tabs (only present on account.html) ---------- */
document.querySelectorAll('.acct-tab[data-tab]').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.acct-tab[data-tab]').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.acct-panel').forEach(p=>p.style.display='none');
    document.querySelector('.acct-panel[data-panel="'+tab.dataset.tab+'"]').style.display='block';
  });
});

/* ---------- modals ---------- */
function openModal(id){document.getElementById(id).classList.add('show');}
function closeModal(id){document.getElementById(id).classList.remove('show');}
