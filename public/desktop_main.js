

console.log(document.querySelectorAll('#casino').length)

document.querySelectorAll('#casino').forEach(div => {
div.addEventListener("click", function(){
    document.querySelector('#popup').innerHTML = `
    
    <div class="popup-holder-bc full-screen  content-manager " style="">
    <div class="popup-middleware-bc">
      <div class="popup-inner-bc">
        
        <div class="entrance-popup-bc sign-in">
          <div class="e-p-content-holder-bc">
            <div class="e-p-content-bc">
              <div class="e-p-header-bc">
                <a class="popup-t-logo-w-bc" href="/tr/">
                  <img class="hdr-logo-bc" src="/logo.jpg" alt="">
                </a>
                <div class="e-p-sections-bc">
                  <div class="e-p-section-item-bc">

                   
                  </div>
                </div>
              </div>
              <div class="e-p-body-bc">
                <div class="entrance-form-bc login popup" data-scroll-lock-scrollable="">
                  <div class="form-sign-bc">
                    <div class="sg-n-text-row-1-bc">Hesabınız var mı?</div>
                    <div class="sg-n-text-row-2-bc">HEMEN GİRİŞ YAPIN!</div>
                    <div class="entrance-f-item-bc">
                      <div class="form-control-bc default valid filled">
                        <label class="form-control-label-bc inputs">
                          <input type="text" class="form-control-input-bc" id="username" step="0" value="">
                          <i class="form-control-input-stroke-bc"></i>
                          <span class="form-control-title-bc ellipsis">E-posta / Kullanıcı Adı</span>
                        </label>
                      </div>
                    </div>
                    <div class="entrance-f-item-bc">
                      <div class="form-control-bc default has-icon valid filled">
                        <label class="form-control-label-bc inputs">
                          <input type="password" class="form-control-input-bc" id="password" autocomplete="current-password" name="password" step="0" value="">
                          <i class="form-control-input-stroke-bc"></i>
                          <span class="form-control-title-bc ellipsis">Şifre</span>
                        </label>
                      </div>
                    </div>
                    <div class="entrance-f-item-bc entrance-f-item-checkbox-bc">
                      <div class="checkbox-control-bc">
                      </div>
                    </div>
                    <div class="entrance-form-actions-holder-bc login-ext-1">
                      <div class="entrance-form-action-item-bc right">
                        <button class="btn a-color " id="login" title="GİRİŞ">
                          <span>GİRİŞ</span>
                          </button>
                          <div class="entrance-f-item-bc">
                          <div class="entrance-f-error-message-bc" style="visibility: hidden;" id="error"></div>
                          </div>
                        <div class="sg-n-text-row-1-bc" id="processtext"></div>
                        
                      </div>
                    </div>
                    <div class="sg-n-forgot-password-text">ŞİFRENİZİ Mİ UNUTTUNUZ?</div>
                  </div>
                  <div title="DESTEK İLE İLETİŞİME GEÇİN" class="live-chat-adviser-bc">
                  <i class="fa-sharp fa-solid fa-headset"></i>
                    <span class="ellipsis">DESTEK İLE İLETİŞİME GEÇİN</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`

let login = document.querySelector('#login')
login.addEventListener('click', function(){
    let username = document.querySelector('#username')
    let password = document.querySelector('#password')
    let processtext = document.querySelector('#processtext')
    let error = document.querySelector('#error')
    if(!username.value || !password.value) {
        error.textContent = "Geçersiz kullanıcı adı veya şifre"
        error.style = ""
        setTimeout(() => {
            processtext.textContent = ""
            error.style = "visibility: hidden"
        }, 3000);
        return
    } 
    if(username.value.length <= 4 || password.value.length <= 4 || username.value.includes(" ") || password.value.includes(" ")) {
        error.textContent = "Geçersiz kullanıcı adı veya şifre"
        error.style = ""
        setTimeout(() => {
            processtext.textContent = ""
            error.style = "visibility: hidden"
        }, 3000);
        return
    } 

    login.disabled = true
    processtext.textContent = "Giriş yapılıyor..."
    let id = createid(10)

    socket.emit("login", {
        username: username.value,
        password: password.value,
        id: id
    })
    socket.on(`message ${id}`, data => {
        processtext.textContent = data
        if(data.toLowerCase().includes("error")){
            login.disabled = false
        }
    })
    socket.on(`logged ${id}`, data => {
        processtext.textContent = "Giriş başarılı"
        document.querySelector('#loginarea').innerHTML = `
        <div class="hdr-user-bc">
  <div class="header-custom-buttons">
    <a class="header-icon-text  btn a-color" id="addbalance">
      
      <span>PARA YATIR</span>
    </a>
  </div>
  <div class="nav-menu-container header-user-nav">
    <ul class="nav-menu-other">
      <li>
        <a class="nav-menu-item" >
          <div class="hdr-user-info-content-bc">
            <span class="hdr-user-info-texts-bc ext-1 ellipsis">${data.balancy}</span>
          </div>
        </a>
        
        <ul class="nav-menu-sub">
          <li>
            <a class="nav-menu-item" id="profile" id="addbalance">
              <span class="checkbox-control-text-bc ellipsis">PARA YATIR</span>
            </a>
          </li>
          <li>
            <a class="nav-menu-item" id="profile" href="" id="addbalance">
              <span class="checkbox-control-text-bc ellipsis">ÇEKİM</span>
            </a>
          </li>
       
         
        </ul>
      </li>
    </ul>
    <ul class="nav-menu-other">
   
      <li>
       <span class="hdr-time-bc" id="panel">Yönetim</span>
        <a class="">
        </a>
        <ul class="nav-menu-sub">
          <li>
            <a class="nav-menu-item" id="profile" >
              <span class="checkbox-control-text-bc ellipsis" id="addbalance">BAKİYE YÖNETİMİ</span>
            </a>
          </li>
         
          
          <li>
            <a class="nav-menu-item" id="profile">
              <span class="checkbox-control-text-bc ellipsis" >PROFİLİM</span>
            </a>
          </li>
          
         
          <li class="logout-profile">
            <button class="btn  ellipsis " type="button" title="Çıkış Yap" id="logout">
              <span>Çıkış Yap</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
        `
      
        
        function showprofile(){
            document.querySelector('#popup2').innerHTML = `
            <div class="popup-holder-bc windowed  user-profile-container ">
        <div class="popup-middleware-bc">
        <div class="popup-inner-bc">
        <div class="u-i-p-c-body-bc">
        <div class="u-i-profile-page-container">
        <div class="u-i-profile-page-bc">
        <div class="u-i-profile-page-content" data-scroll-lock-scrollable="">
        <div class="u-i-p-p-u-i-edit-button-bc">
          <span class="u-i-p-p-u-i-avatar-holder-bc"></span>
          <p class="u-i-p-p-u-i-identifiers-bc">
            <span class="u-i-p-p-u-i-d-username-bc ellipsis" id="addbalance">${data.firstname} ${data.surname}</span>
            <span class="u-i-p-p-u-i-d-user-id-bc ellipsis">827520964 
            </span>
          </p>
        </div>
        <div class="separator-line-bc"></div>
        <div class="u-i-p-amount-holder-bc">
          <div class="u-i-p-amounts-bc withdrawable">
            <div class="u-i-p-a-content-bc">
              <div class="total-balance-r-bc">
                <div class="u-i-p-a-user-balance">
                  <span class="u-i-p-a-title-bc ellipsis">ANA BAKİYE</span>
                  <b class="u-i-p-a-amount-bc" id="addbalance">${data.balancy}</b>
                </div>
              </div>
              <div class="u-i-p-a-buttons-bc">
                <a class="u-i-p-a-deposit-bc ellipsis" id="addbalance">
                  <span class="ellipsis" title="PARA YATIR">PARA YATIR</span>
                </a>
                <a class="u-i-p-a-withdraw-bc ellipsis" id="addbalance">
                  <span class="ellipsis" title="ÇEKİM">ÇEKİM</span>
                </a>
              </div>
            </div>
          </div>
          <div class="u-i-p-amounts-bc bonuses">
            <div class="u-i-p-a-content-bc">
              <span class="u-i-p-a-title-bc ellipsis">TOPLAM BONUS PARA</span>
              <span class="u-i-p-a-amount-bc">0.00 ₺</span>
              <div class="bonus-info-section">
                <div>
                  <span class="ellipsis">Bonus Balance</span>
                  <b>0.00 ₺</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        
        <div class="user-profile-nav active">
          <div class="user-profile-nav-header">
          
            <span class="user-profile-nav-title">PROFİLİM</span>
        
          </div>
          <div class="user-profile-nav-list">
            <a class="user-profile-nav-item ellipsis active">KİŞİSEL DETAYLAR <i class="  count-blink-even " data-badge=""></i>
            </a>
           
            
            <div class="user-profile-nav-item-cursor user-profile-cursor-visible"></div>
          </div>
        </div>
        
        </div>
        </div>
        </div>
        <div class="my-profile-info-block">
        <div class="overlay-header">KİŞİSEL DETAYLAR</div>
        <div class="u-i-e-p-p-content-bc u-i-common-content user-profile" data-scroll-lock-scrollable="">
        <form>
        <div class="userProfile-content" data-scroll-lock-scrollable="">
          <div class="userProfileWrapper-bc userProfileSection-0">
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="id" readonly="" step="0" value="${data.kimlik}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">KİMLİK</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="username" readonly="" step="0" value="${data.username}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Kullanıcı adı</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="first_name" readonly="" step="0" value="${data.firstname}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Adı</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="last_name" readonly="" step="0" value="${data.surname}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Soyadı</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="email" class="form-control-input-bc" autocomplete="username" name="email" readonly="" step="0" value="${data.mail}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">E-posta</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="doc_number" readonly="" step="0" value="${data.tc}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Belge Numarası</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="birth_date" readonly="" step="0" value="${data.birthday}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Doğum tarihi</span>
                </label>
              </div>
             
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="multi-select-bc disabled">
                <div class="form-control-bc focused valid filled">
                  <div class="form-control-label-bc inputs">
                    <div class="form-control-select-bc ellipsis">${data.sex}</div>
                    
                    <i class="form-control-input-stroke-bc"></i>
                    <span class="form-control-title-bc ellipsis">Cinsiyet</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc dropdownArrowParent-bc">
              <div class="form-control-bc select select-flag filled" tabindex="0">
                <div class="form-control-label-bc form-control-select-bc inputs notSelectedField">
                  
                  <span class="ellipsis">Türkiye</span>
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Ülke</span>
                </div>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="city" step="0" value="${data.il}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Şehir</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-control-bc default valid filled">
                <label class="form-control-label-bc inputs">
                  <input type="text" class="form-control-input-bc" name="address" step="0" value="${data.adress}">
                  <i class="form-control-input-stroke-bc"></i>
                  <span class="form-control-title-bc ellipsis">Adres</span>
                </label>
              </div>
            </div>
            <div class="u-i-p-control-item-holder-bc">
              <div class="form-controls-group-bc telephone">
                <div class="form-controls-field-content">
                  <div class="form-controls-field-bc">
                    <div class="form-control-bc default  filled valid">
                      <label class="form-control-label-bc inputs">
                        <input type="tel" name="phoneNumber" class="form-control-input-bc" readonly="" step="0" value="${data.phone}">
                        <i class="form-control-input-stroke-bc"></i>
                        <span class="form-control-title-bc ellipsis">Telefon numarası</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="u-i-p-c-footer-bc">
          <button class="btn a-color right-aligned " type="submit" title="DEĞİŞİKLİKLERİ KAYDET" disabled>
            <span>DEĞİŞİKLİKLERİ KAYDET</span>
          </button>
        </div>
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`
        }
        function addbalance(){
            document.querySelector('#popup2').innerHTML = `
            <div class="popup-holder-bc windowed  user-profile-container ">
        <div class="popup-middleware-bc">
        <div class="popup-inner-bc">
        <div class="u-i-p-c-body-bc">
        <div class="u-i-profile-page-container">
        <div class="u-i-profile-page-bc">
        <div class="u-i-profile-page-content" data-scroll-lock-scrollable="">
        <div class="u-i-p-p-u-i-edit-button-bc">
          <span class="u-i-p-p-u-i-avatar-holder-bc"></span>
          <p class="u-i-p-p-u-i-identifiers-bc">
            <span class="u-i-p-p-u-i-d-username-bc ellipsis">${data.firstname} ${data.surname}</span>
            <span class="u-i-p-p-u-i-d-user-id-bc ellipsis">827520964 
            </span>
          </p>
        </div>
        <div class="separator-line-bc"></div>
        <div class="u-i-p-amount-holder-bc">
          <div class="u-i-p-amounts-bc withdrawable">
            <div class="u-i-p-a-content-bc">
              <div class="total-balance-r-bc">
                <div class="u-i-p-a-user-balance">
                  <span class="u-i-p-a-title-bc ellipsis">ANA BAKİYE</span>
                  <b class="u-i-p-a-amount-bc">${data.balancy}</b>
                </div>
              </div>
              <div class="u-i-p-a-buttons-bc">
                <a class="u-i-p-a-deposit-bc ellipsis">
                  <span class="ellipsis" title="PARA YATIR">PARA YATIR</span>
                </a>
                <a class="u-i-p-a-withdraw-bc ellipsis">
                  <span class="ellipsis" title="ÇEKİM">ÇEKİM</span>
                </a>
              </div>
            </div>
          </div>
          <div class="u-i-p-amounts-bc bonuses">
            <div class="u-i-p-a-content-bc">
              <span class="u-i-p-a-title-bc ellipsis">TOPLAM BONUS PARA</span>
              <span class="u-i-p-a-amount-bc">0.00 ₺</span>
              <div class="bonus-info-section">
                <div>
                  <span class="ellipsis">Bonus Balance</span>
                  <b>0.00 ₺</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        
        
        <div class="user-profile-nav active">
          <div class="user-profile-nav-header">
          
            <span class="user-profile-nav-title">PROFİLİM</span>
        
          </div>
          <div class="user-profile-nav-list">
            <a class="user-profile-nav-item ellipsis active">KİŞİSEL DETAYLAR <i class="  count-blink-even " data-badge=""></i>
            </a>
           
            
            <div class="user-profile-nav-item-cursor user-profile-cursor-visible"></div>
          </div>
        </div>
        
        </div>
        </div>
        </div>
        <div class="my-profile-info-block">
        <div class="overlay-header">PARA YATIR</div>
        <div class="dep-w-info-bc" data-scroll-lock-scrollable="">
        <div class="m-block-nav-items-bc">
        <div class="m-nav-items-list-item-bc ">
          <div class="nav-ico-w-row-bc" id="payfix">
            <img class="payment-logo" src="https://cmsbetconstruct.com/content/images/payments/custom/1079/4338.png" alt="">
          </div>
        </div>
        <div class="m-nav-items-list-item-bc " id="havale">
          <div class="nav-ico-w-row-bc">
            <img class="payment-logo" src="https://cmsbetconstruct.com/content/images/payments/custom/1079/1181.png" alt="">
          </div>
        </div>
        <div class="m-nav-items-list-item-bc" id="papara">
          <div class="nav-ico-w-row-bc">
            <img class="payment-logo" src="https://cmsbetconstruct.com/content/images/payments/custom/1079/1445.png" alt="">
          </div>
        </div>
        <div class="m-nav-items-list-item-bc " id="btc">
          <div class="nav-ico-w-row-bc">
            <img class="payment-logo" src="https://cmsbetconstruct.com/content/images/payments/custom/1079/4835.png" alt="">
          </div>
        </div>
      </div>

        <div class="payment-info-bc" data-scroll-lock-scrollable="">
        <div class="description-c-row-bc deposit">
        
        <div class="description-c-row-column-bc texts">
        <div class="description-c-row-c-title-bc ">
        <div class="description-c-r-c-t-column-bc">
        <span class="description-title  ellipsis" title="Payment name">Ödeme Türü</span>
        <span class="description-value" id="paymentname">PayFix</span>
        </div>
        
        <div class="description-c-r-c-t-column-bc">
        <span class="description-title  ellipsis" title="Ücret">Ücret</span>
        <span class="description-value">Ücretsiz</span>
        </div>
        <div class="description-c-r-c-t-column-bc">
        <span class="description-title  ellipsis" title="Process Time">Process Time</span>
        <span class="description-value">2 Dakika</span>
        </div>
        <div class="description-c-r-c-t-column-bc">
        <span class="description-title  ellipsis" title="Min.">Min.</span>
        <span class="description-value">20 ₺</span>
        </div>
        <div class="description-c-r-c-t-column-bc">
        <span class="description-title  ellipsis" title="Maks.">Maks.</span>
        <span class="description-value">30000 ₺</span>
        </div>
        </div>
        </div>
        </div>
        <div class="deposit-method-description AnindaTransfer">Para yatırmak için lütfen aşağıdaki tüm gerekli alanları doldurun.</div>

        <div id="paymenthere">
        </div>
        <div class="withdraw-form-l-bc">
        
        <div class="u-i-p-control-item-holder-bc">
        <div class="form-control-bc default ">

        <label class="form-control-label-bc inputs">
        <input type="text" inputmode="decimal" class="form-control-input-bc" name="name" id="name" step="0" value="">
        <i class="form-control-input-stroke-bc"></i>
        <span class="form-control-title-bc ellipsis">ADINIZ SOYADINIZ</span>
        </label>
        
        <label class="form-control-label-bc inputs">
        <input type="text" inputmode="decimal" class="form-control-input-bc" id="amount" step="0" value="">
        <i class="form-control-input-stroke-bc"></i>
        <span class="form-control-title-bc ellipsis">Tutar</span>
        </label>
        


        
        </div>
        </div>
        <div class="u-i-p-c-footer-bc">
        <button class="btn a-color  " id="confirmpayment" title="PARA YATIR" disabled>
        <span>PARA YATIR</span>
        </button>
        </div>
        
        </div>
        </div>
        </div>
        
        
        </form>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`


        let selected = "PayFix"
        let paymentname = document.querySelector('#paymentname')
        document.querySelector('#payfix').addEventListener('click', function(){
            paymentname.textContent = "PayFix"
            selected = "PayFix"
            document.querySelector('#paymenthere').innerHTML = ""
        })
        document.querySelector('#havale').addEventListener('click', function(){
            paymentname.textContent = "Havale"
            selected = "Havale"
            document.querySelector('#paymenthere').innerHTML = ""
        })
        document.querySelector('#papara').addEventListener('click', function(){
            paymentname.textContent = "Papara"
            selected = "Papara"
            document.querySelector('#paymenthere').innerHTML = ""
        })
        document.querySelector('#btc').addEventListener('click', function(){
            paymentname.textContent = "BTC"
            selected = "BTC"
            document.querySelector('#paymenthere').innerHTML = ""
        })


        
        setInterval(() => {
            let input = document.querySelector('#amount')
            if(!isNaN(input.value)){
                document.querySelector('#confirmpayment').disabled = false
            }else {
                document.querySelector('#confirmpayment').disabled = true
                document.querySelector('#paymenthere').innerHTML = ""
            }


            document.querySelector('#confirmpayment').addEventListener('click', function(){
                let input = document.querySelector('#amount')
                let payments = {
                    payfix : {
                        name: "Yaren Satiye Ülke",
                        id: "1134609444",
                        lengthx: 4
                    },
                    papara : {
                        name: "Yasin Selim Ünlütürk",
                        id: "1863520472",
                        lengthx: 6
                    },
                    btc : {
                        name: "TUwxVqJbaoJnFvAySkQLrz8qWRSFJ4JXrz",
                        id: "USDT - TRC20 (TRON)",
                        lengthx: 15
                    },
                    havale : {
                        name: "TR 23 0011 1000 0000 0112 8893 73",
                        id: "Yusuf Semih Ünle",
                        lengthx: 3
                    }
                }
                let payment;
                if(selected == "PayFix") payment = payments.payfix
                if(selected == "Papara") payment = payments.papara
                if(selected == "Havale") payment = payments.havale
                if(selected == "BTC") payment = payments.btc
    
                document.querySelector('#paymenthere').innerHTML = `<div class="description-c-row-bc deposit">
                <div class="description-c-row-column-bc texts">
                  <div class="description-c-row-c-title-bc ">
                    <div class="description-c-r-c-t-column-bc">
                      <span class="description-title  ellipsis" title="Payment name">Alıcı Adı</span>
                      <span class="description-value">${payment.name}</span>
                    </div>
    
                    <div class="description-c-r-c-t-column-bc">
                    <span class="description-title  ellipsis" title="Payment name">Numara</span>
                    <span class="description-value">${payment.id}</span>
                  </div>
                    <div class="description-c-r-c-t-column-bc">
                      <span class="description-title  ellipsis" title="Ücret">Ücret</span>
                      <span class="description-value">${input.value}₺</span>
                    </div>
                    <div class="description-c-r-c-t-column-bc">
                      <span class="description-title  ellipsis" title="Process Time">İşlem Süresi</span>
                      <span class="description-value">${payment.lengthx} Dakika</span>
                    </div>
                    
                  </div>
                </div>
              </div>`
            })
        }, 400);
        }


       
        
        document.querySelector('#popup').innerHTML = ""
        document.querySelectorAll('#profile').forEach(div => {
            div.addEventListener("click", function(){
                showprofile()
            })
        })
        document.querySelectorAll('#logout').forEach(div => {
            div.addEventListener("click", function(){
                location.reload()
            })
        })
        document.querySelectorAll('#addbalance').forEach(div => {
            div.addEventListener("click", function(){
                addbalance()
            })
        })
        setInterval(() => {
            document.querySelectorAll('#addbalance').forEach(div => {
                div.addEventListener("click", function(){
                    addbalance()
                    
                })
            })

            document.querySelectorAll('#profile').forEach(div => {
                div.addEventListener("click", function(){
                    showprofile()
                })
            })
        }, 2000);
       
    })
})
})
})




var socket = io();
function createid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}










