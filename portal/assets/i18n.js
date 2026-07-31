/* ============================================================
   NASLAB Member Portal — i18n(14 语种)
   ------------------------------------------------------------
   · 静态稿的语言切换:点菜单 → localStorage + 当场应用(拦截 /lang/xx 跳转)。
     [接线] 线上如果保留 /lang/{code} 整页跳转,删掉下面 MENU 那段拦截即可;
     字典与 apply() 不用动 —— 服务端把 <html lang> 写对,本文件照常接管文案。
   · ar / fa 自动切 RTL(auth.css 里已有 [dir="rtl"] 的镜像规则)。
   · 非拉丁字形走系统字体栈(auth.css 末尾 per-lang 覆盖),不额外拖字体文件。
   · 文案带标记的键(引文的 <em>、条款的 <a>)整句存 HTML —— 语序因语言而异,
     拆开翻会出语病;链接地址统一占位 naslabtec.com/contact,[接线] 换真地址。
   ============================================================ */
(function () {
  "use strict";

  var LINK = 'https://naslabtec.com/contact';
  var A = function (label) { return '<a href="' + LINK + '">' + label + '</a>'; };

  /* 键名约定:l=label ph=placeholder a=aria k=kicker q=quote(HTML) err=校验 */
  var D = {
  en: {
    titleLogin:"NASLAB — Member Login", titleRegister:"NASLAB — Create Account",
    titleForgot:"NASLAB — Reset Password", titleReset:"NASLAB — Set New Password",
    kMemberPortal:"Member Portal", backSignin:"← Back to sign in",
    lEmail:"Email", lPassword:"Password", lCaptcha:"Captcha",
    phCaptcha:"Enter the code", aShowPw:"Show password", aRefreshCap:"Refresh captcha",
    loginH1:"Sign in to your account",
    loginSub:"Access your holdings, statements and private reporting.",
    keepSigned:"Keep me signed in", forgotQ:"Forgot password?",
    btnSignin:"Sign In", loadSignin:"Signing in…",
    footLogin:'Don’t have an account? <a class="link" href="register.html">Create an account</a>',
    kMembersOnly:"Members Only", qLogin:"One lock. One holder. <em>Yours</em>.",
    regH1:"Create your account",
    regSub:"You’ll need a Sponsor ID from the member who invited you.",
    pwHint:"At least 6 characters. Longer with mixed case, a number and a symbol is stronger.",
    lConfirmPw:"Confirm password", lSponsor:"Sponsor ID",
    btnCreate:"Create Account", loadCreate:"Creating account…",
    terms:"By creating an account you agree to the "+A("Terms of Service")+" and "+A("Privacy Policy")+".",
    footRegister:'Already have an account? <a class="link" href="login.html">Sign in</a>',
    kByInv:"By Invitation", qRegister:"The lock is built the moment someone <em>vouches</em> for you.",
    fgH1:"Reset your password",
    fgSub:"Enter the email on your account and we’ll send you a reset link.",
    btnSend:"Send Reset Link", loadSend:"Sending…",
    doneKicker:"Check your inbox", doneH1:"Reset link sent",
    doneBody:"If that email is registered with NASLAB, a reset link is on its way. The link expires in 60&nbsp;minutes.",
    doneBack:"Back to sign in",
    footForgot:'Remembered it? <a class="link" href="login.html">Sign in</a>',
    kRecovery:"Account Recovery", qForgot:"The lock stays. Only the <em>key</em> is replaced.",
    rsH1:"Set a new password", rsSub:"Choose a new password for your NASLAB account.",
    lNewPw:"New password", pwHintShort:"At least 6 characters.", lConfirmNewPw:"Confirm new password",
    btnSave:"Save New Password", loadSave:"Saving…",
    footReset:'Back to <a class="link" href="login.html">sign in</a>',
    kNewPw:"New Password", qReset:"A new key. The <em>same</em> door.",
    errEmailReq:"Please enter your email address.",
    errEmailBad:"That doesn’t look like a valid email address.",
    errPwReq:"Please enter your password.", errPwShort:"Password must be at least 6 characters.",
    errPwConfirmReq:"Please confirm your password.", errPwMismatch:"The two passwords don’t match.",
    errCapReq:"Please enter the characters shown.", pleaseWait:"Please wait…"
  },
  cn: {
    titleLogin:"NASLAB — 会员登录", titleRegister:"NASLAB — 创建账户",
    titleForgot:"NASLAB — 重置密码", titleReset:"NASLAB — 设置新密码",
    kMemberPortal:"会员门户", backSignin:"← 返回登录",
    lEmail:"邮箱", lPassword:"密码", lCaptcha:"验证码",
    phCaptcha:"输入图中字符", aShowPw:"显示密码", aRefreshCap:"刷新验证码",
    loginH1:"登录您的账户", loginSub:"查看您的持仓、结单与专属报告。",
    keepSigned:"保持登录", forgotQ:"忘记密码?",
    btnSignin:"登 录", loadSignin:"正在登录…",
    footLogin:'还没有账户? <a class="link" href="register.html">创建账户</a>',
    kMembersOnly:"会员专属", qLogin:"一把锁,一位持有人。<em>就是您</em>。",
    regH1:"创建您的账户", regSub:"您需要邀请人提供的推荐人 ID(Sponsor ID)。",
    pwHint:"至少 6 位。混合大小写、数字与符号,并且更长,会更安全。",
    lConfirmPw:"确认密码", lSponsor:"推荐人 ID",
    btnCreate:"创建账户", loadCreate:"正在创建…",
    terms:"创建账户即表示您同意 "+A("服务条款")+" 与 "+A("隐私政策")+"。",
    footRegister:'已有账户? <a class="link" href="login.html">登录</a>',
    kByInv:"凭邀请加入", qRegister:"有人为您<em>作保</em>的那一刻,这把锁便铸成了。",
    fgH1:"重置您的密码", fgSub:"输入账户邮箱,我们将发送重置链接。",
    btnSend:"发送重置链接", loadSend:"发送中…",
    doneKicker:"请查收邮件", doneH1:"重置链接已发送",
    doneBody:"如果该邮箱已在 NASLAB 注册,重置链接正在路上。链接 60&nbsp;分钟内有效。",
    doneBack:"返回登录",
    footForgot:'想起来了? <a class="link" href="login.html">登录</a>',
    kRecovery:"账户找回", qForgot:"锁还在,换的只是<em>钥匙</em>。",
    rsH1:"设置新密码", rsSub:"为您的 NASLAB 账户设置一个新密码。",
    lNewPw:"新密码", pwHintShort:"至少 6 位。", lConfirmNewPw:"确认新密码",
    btnSave:"保存新密码", loadSave:"保存中…",
    footReset:'返回<a class="link" href="login.html">登录</a>',
    kNewPw:"新密码", qReset:"新的钥匙,<em>同一扇</em>门。",
    errEmailReq:"请输入邮箱地址。", errEmailBad:"邮箱地址格式不正确。",
    errPwReq:"请输入密码。", errPwShort:"密码至少需要 6 位。",
    errPwConfirmReq:"请再次输入密码。", errPwMismatch:"两次输入的密码不一致。",
    errCapReq:"请输入图中显示的字符。", pleaseWait:"请稍候…"
  },
  ja: {
    titleLogin:"NASLAB — メンバーログイン", titleRegister:"NASLAB — アカウント作成",
    titleForgot:"NASLAB — パスワード再設定", titleReset:"NASLAB — 新しいパスワード",
    kMemberPortal:"メンバーポータル", backSignin:"← ログインへ戻る",
    lEmail:"メールアドレス", lPassword:"パスワード", lCaptcha:"認証コード",
    phCaptcha:"表示された文字を入力", aShowPw:"パスワードを表示", aRefreshCap:"コードを更新",
    loginH1:"アカウントにログイン", loginSub:"保有資産・取引明細・限定レポートをご覧いただけます。",
    keepSigned:"ログイン状態を保持", forgotQ:"パスワードをお忘れですか?",
    btnSignin:"ログイン", loadSignin:"ログイン中…",
    footLogin:'アカウントをお持ちでない方は <a class="link" href="register.html">アカウント作成</a>',
    kMembersOnly:"メンバー限定", qLogin:"ひとつの錠、ひとりの持ち主。<em>あなたです</em>。",
    regH1:"アカウントを作成", regSub:"招待者のスポンサー ID が必要です。",
    pwHint:"6 文字以上。大文字小文字・数字・記号を混ぜ、長くするほど安全です。",
    lConfirmPw:"パスワード(確認)", lSponsor:"スポンサー ID",
    btnCreate:"アカウント作成", loadCreate:"作成中…",
    terms:"アカウントを作成すると、"+A("利用規約")+" と "+A("プライバシーポリシー")+" に同意したものとみなされます。",
    footRegister:'すでにアカウントをお持ちの方は <a class="link" href="login.html">ログイン</a>',
    kByInv:"招待制", qRegister:"誰かがあなたを<em>保証</em>した瞬間、この錠は生まれます。",
    fgH1:"パスワードを再設定", fgSub:"登録メールアドレスに再設定リンクをお送りします。",
    btnSend:"再設定リンクを送信", loadSend:"送信中…",
    doneKicker:"受信箱をご確認ください", doneH1:"リンクを送信しました",
    doneBody:"そのメールアドレスが NASLAB に登録されていれば、再設定リンクが届きます。リンクの有効期限は 60&nbsp;分です。",
    doneBack:"ログインへ戻る",
    footForgot:'思い出した方は <a class="link" href="login.html">ログイン</a>',
    kRecovery:"アカウント回復", qForgot:"錠はそのまま。替わるのは<em>鍵</em>だけ。",
    rsH1:"新しいパスワードを設定", rsSub:"NASLAB アカウントの新しいパスワードを設定してください。",
    lNewPw:"新しいパスワード", pwHintShort:"6 文字以上。", lConfirmNewPw:"新しいパスワード(確認)",
    btnSave:"新しいパスワードを保存", loadSave:"保存中…",
    footReset:'<a class="link" href="login.html">ログイン</a>へ戻る',
    kNewPw:"新しいパスワード", qReset:"新しい鍵、<em>同じ</em>扉。",
    errEmailReq:"メールアドレスを入力してください。", errEmailBad:"メールアドレスの形式が正しくありません。",
    errPwReq:"パスワードを入力してください。", errPwShort:"パスワードは 6 文字以上で入力してください。",
    errPwConfirmReq:"確認のためパスワードを再入力してください。", errPwMismatch:"パスワードが一致しません。",
    errCapReq:"表示された文字を入力してください。", pleaseWait:"お待ちください…"
  },
  ko: {
    titleLogin:"NASLAB — 회원 로그인", titleRegister:"NASLAB — 계정 만들기",
    titleForgot:"NASLAB — 비밀번호 재설정", titleReset:"NASLAB — 새 비밀번호 설정",
    kMemberPortal:"회원 포털", backSignin:"← 로그인으로 돌아가기",
    lEmail:"이메일", lPassword:"비밀번호", lCaptcha:"보안 문자",
    phCaptcha:"표시된 문자를 입력", aShowPw:"비밀번호 표시", aRefreshCap:"보안 문자 새로고침",
    loginH1:"계정에 로그인", loginSub:"보유 자산, 명세서, 전용 리포트를 확인하세요.",
    keepSigned:"로그인 상태 유지", forgotQ:"비밀번호를 잊으셨나요?",
    btnSignin:"로그인", loadSignin:"로그인 중…",
    footLogin:'계정이 없으신가요? <a class="link" href="register.html">계정 만들기</a>',
    kMembersOnly:"회원 전용", qLogin:"하나의 자물쇠, 한 명의 주인. <em>바로 당신</em>.",
    regH1:"계정 만들기", regSub:"초대한 회원의 스폰서 ID가 필요합니다.",
    pwHint:"6자 이상. 대소문자·숫자·기호를 섞어 길게 만들수록 안전합니다.",
    lConfirmPw:"비밀번호 확인", lSponsor:"스폰서 ID",
    btnCreate:"계정 만들기", loadCreate:"계정 생성 중…",
    terms:"계정을 만들면 "+A("서비스 약관")+" 및 "+A("개인정보 처리방침")+"에 동의하는 것으로 간주됩니다.",
    footRegister:'이미 계정이 있으신가요? <a class="link" href="login.html">로그인</a>',
    kByInv:"초대 전용", qRegister:"누군가 당신을 <em>보증</em>하는 순간, 이 자물쇠가 만들어집니다.",
    fgH1:"비밀번호 재설정", fgSub:"계정 이메일을 입력하시면 재설정 링크를 보내드립니다.",
    btnSend:"재설정 링크 보내기", loadSend:"전송 중…",
    doneKicker:"받은편지함을 확인하세요", doneH1:"재설정 링크 전송됨",
    doneBody:"해당 이메일이 NASLAB에 등록되어 있다면 재설정 링크가 발송됩니다. 링크는 60&nbsp;분 후 만료됩니다.",
    doneBack:"로그인으로 돌아가기",
    footForgot:'기억나셨나요? <a class="link" href="login.html">로그인</a>',
    kRecovery:"계정 복구", qForgot:"자물쇠는 그대로. 바뀌는 것은 <em>열쇠</em>뿐.",
    rsH1:"새 비밀번호 설정", rsSub:"NASLAB 계정의 새 비밀번호를 설정하세요.",
    lNewPw:"새 비밀번호", pwHintShort:"6자 이상.", lConfirmNewPw:"새 비밀번호 확인",
    btnSave:"새 비밀번호 저장", loadSave:"저장 중…",
    footReset:'<a class="link" href="login.html">로그인</a>으로 돌아가기',
    kNewPw:"새 비밀번호", qReset:"새 열쇠, <em>같은</em> 문.",
    errEmailReq:"이메일 주소를 입력해 주세요.", errEmailBad:"올바른 이메일 주소가 아닙니다.",
    errPwReq:"비밀번호를 입력해 주세요.", errPwShort:"비밀번호는 6자 이상이어야 합니다.",
    errPwConfirmReq:"비밀번호를 다시 입력해 주세요.", errPwMismatch:"비밀번호가 일치하지 않습니다.",
    errCapReq:"표시된 문자를 입력해 주세요.", pleaseWait:"잠시만 기다려 주세요…"
  },
  th: {
    titleLogin:"NASLAB — เข้าสู่ระบบสมาชิก", titleRegister:"NASLAB — สร้างบัญชี",
    titleForgot:"NASLAB — รีเซ็ตรหัสผ่าน", titleReset:"NASLAB — ตั้งรหัสผ่านใหม่",
    kMemberPortal:"พอร์ทัลสมาชิก", backSignin:"← กลับไปเข้าสู่ระบบ",
    lEmail:"อีเมล", lPassword:"รหัสผ่าน", lCaptcha:"รหัสยืนยัน",
    phCaptcha:"พิมพ์ตัวอักษรที่แสดง", aShowPw:"แสดงรหัสผ่าน", aRefreshCap:"รีเฟรชรหัสยืนยัน",
    loginH1:"เข้าสู่ระบบบัญชีของคุณ", loginSub:"ดูสินทรัพย์ รายการเดินบัญชี และรายงานส่วนตัวของคุณ",
    keepSigned:"จดจำการเข้าสู่ระบบ", forgotQ:"ลืมรหัสผ่าน?",
    btnSignin:"เข้าสู่ระบบ", loadSignin:"กำลังเข้าสู่ระบบ…",
    footLogin:'ยังไม่มีบัญชี? <a class="link" href="register.html">สร้างบัญชี</a>',
    kMembersOnly:"เฉพาะสมาชิก", qLogin:"กุญแจหนึ่งดอก ผู้ถือหนึ่งเดียว <em>คือคุณ</em>",
    regH1:"สร้างบัญชีของคุณ", regSub:"คุณต้องมี Sponsor ID จากสมาชิกผู้เชิญ",
    pwHint:"อย่างน้อย 6 ตัวอักษร ยิ่งยาวและผสมตัวพิมพ์ใหญ่เล็ก ตัวเลข สัญลักษณ์ ยิ่งปลอดภัย",
    lConfirmPw:"ยืนยันรหัสผ่าน", lSponsor:"Sponsor ID",
    btnCreate:"สร้างบัญชี", loadCreate:"กำลังสร้างบัญชี…",
    terms:"การสร้างบัญชีถือว่าคุณยอมรับ "+A("เงื่อนไขการให้บริการ")+" และ "+A("นโยบายความเป็นส่วนตัว"),
    footRegister:'มีบัญชีอยู่แล้ว? <a class="link" href="login.html">เข้าสู่ระบบ</a>',
    kByInv:"เข้าร่วมด้วยคำเชิญ", qRegister:"แม่กุญแจนี้ถูกสร้างขึ้น ในวินาทีที่มีคน<em>รับรอง</em>คุณ",
    fgH1:"รีเซ็ตรหัสผ่านของคุณ", fgSub:"กรอกอีเมลของบัญชี แล้วเราจะส่งลิงก์รีเซ็ตให้",
    btnSend:"ส่งลิงก์รีเซ็ต", loadSend:"กำลังส่ง…",
    doneKicker:"ตรวจกล่องจดหมายของคุณ", doneH1:"ส่งลิงก์รีเซ็ตแล้ว",
    doneBody:"หากอีเมลนี้ลงทะเบียนกับ NASLAB ลิงก์รีเซ็ตกำลังไปถึงคุณ ลิงก์หมดอายุใน 60&nbsp;นาที",
    doneBack:"กลับไปเข้าสู่ระบบ",
    footForgot:'นึกออกแล้ว? <a class="link" href="login.html">เข้าสู่ระบบ</a>',
    kRecovery:"กู้คืนบัญชี", qForgot:"แม่กุญแจยังอยู่ เปลี่ยนเพียง<em>ลูกกุญแจ</em>",
    rsH1:"ตั้งรหัสผ่านใหม่", rsSub:"เลือกรหัสผ่านใหม่สำหรับบัญชี NASLAB ของคุณ",
    lNewPw:"รหัสผ่านใหม่", pwHintShort:"อย่างน้อย 6 ตัวอักษร", lConfirmNewPw:"ยืนยันรหัสผ่านใหม่",
    btnSave:"บันทึกรหัสผ่านใหม่", loadSave:"กำลังบันทึก…",
    footReset:'กลับไป<a class="link" href="login.html">เข้าสู่ระบบ</a>',
    kNewPw:"รหัสผ่านใหม่", qReset:"ลูกกุญแจดอกใหม่ ประตู<em>บานเดิม</em>",
    errEmailReq:"กรุณากรอกอีเมลของคุณ", errEmailBad:"รูปแบบอีเมลไม่ถูกต้อง",
    errPwReq:"กรุณากรอกรหัสผ่าน", errPwShort:"รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    errPwConfirmReq:"กรุณายืนยันรหัสผ่าน", errPwMismatch:"รหัสผ่านทั้งสองไม่ตรงกัน",
    errCapReq:"กรุณากรอกตัวอักษรที่แสดง", pleaseWait:"กรุณารอสักครู่…"
  },
  vi: {
    titleLogin:"NASLAB — Đăng nhập thành viên", titleRegister:"NASLAB — Tạo tài khoản",
    titleForgot:"NASLAB — Đặt lại mật khẩu", titleReset:"NASLAB — Đặt mật khẩu mới",
    kMemberPortal:"Cổng thành viên", backSignin:"← Quay lại đăng nhập",
    lEmail:"Email", lPassword:"Mật khẩu", lCaptcha:"Mã xác nhận",
    phCaptcha:"Nhập ký tự hiển thị", aShowPw:"Hiện mật khẩu", aRefreshCap:"Làm mới mã",
    loginH1:"Đăng nhập tài khoản", loginSub:"Xem tài sản, sao kê và báo cáo riêng của bạn.",
    keepSigned:"Duy trì đăng nhập", forgotQ:"Quên mật khẩu?",
    btnSignin:"Đăng nhập", loadSignin:"Đang đăng nhập…",
    footLogin:'Chưa có tài khoản? <a class="link" href="register.html">Tạo tài khoản</a>',
    kMembersOnly:"Dành riêng thành viên", qLogin:"Một ổ khóa. Một chủ nhân. <em>Là bạn</em>.",
    regH1:"Tạo tài khoản của bạn", regSub:"Bạn cần Sponsor ID từ thành viên đã mời bạn.",
    pwHint:"Ít nhất 6 ký tự. Dài hơn, kèm chữ hoa chữ thường, số và ký hiệu sẽ an toàn hơn.",
    lConfirmPw:"Xác nhận mật khẩu", lSponsor:"Sponsor ID",
    btnCreate:"Tạo tài khoản", loadCreate:"Đang tạo tài khoản…",
    terms:"Khi tạo tài khoản, bạn đồng ý với "+A("Điều khoản dịch vụ")+" và "+A("Chính sách quyền riêng tư")+".",
    footRegister:'Đã có tài khoản? <a class="link" href="login.html">Đăng nhập</a>',
    kByInv:"Chỉ theo lời mời", qRegister:"Ổ khóa này hình thành ngay khoảnh khắc có người <em>bảo chứng</em> cho bạn.",
    fgH1:"Đặt lại mật khẩu", fgSub:"Nhập email tài khoản, chúng tôi sẽ gửi liên kết đặt lại.",
    btnSend:"Gửi liên kết đặt lại", loadSend:"Đang gửi…",
    doneKicker:"Kiểm tra hộp thư của bạn", doneH1:"Đã gửi liên kết",
    doneBody:"Nếu email này đã đăng ký với NASLAB, liên kết đặt lại đang được gửi tới. Liên kết hết hạn sau 60&nbsp;phút.",
    doneBack:"Quay lại đăng nhập",
    footForgot:'Nhớ ra rồi? <a class="link" href="login.html">Đăng nhập</a>',
    kRecovery:"Khôi phục tài khoản", qForgot:"Ổ khóa vẫn đó. Chỉ thay <em>chìa khóa</em>.",
    rsH1:"Đặt mật khẩu mới", rsSub:"Chọn mật khẩu mới cho tài khoản NASLAB của bạn.",
    lNewPw:"Mật khẩu mới", pwHintShort:"Ít nhất 6 ký tự.", lConfirmNewPw:"Xác nhận mật khẩu mới",
    btnSave:"Lưu mật khẩu mới", loadSave:"Đang lưu…",
    footReset:'Quay lại <a class="link" href="login.html">đăng nhập</a>',
    kNewPw:"Mật khẩu mới", qReset:"Chìa khóa mới, <em>cùng một</em> cánh cửa.",
    errEmailReq:"Vui lòng nhập địa chỉ email.", errEmailBad:"Địa chỉ email không hợp lệ.",
    errPwReq:"Vui lòng nhập mật khẩu.", errPwShort:"Mật khẩu phải có ít nhất 6 ký tự.",
    errPwConfirmReq:"Vui lòng xác nhận mật khẩu.", errPwMismatch:"Hai mật khẩu không khớp.",
    errCapReq:"Vui lòng nhập ký tự hiển thị.", pleaseWait:"Vui lòng chờ…"
  },
  id: {
    titleLogin:"NASLAB — Masuk Anggota", titleRegister:"NASLAB — Buat Akun",
    titleForgot:"NASLAB — Atur Ulang Kata Sandi", titleReset:"NASLAB — Kata Sandi Baru",
    kMemberPortal:"Portal Anggota", backSignin:"← Kembali ke halaman masuk",
    lEmail:"Email", lPassword:"Kata sandi", lCaptcha:"Kode verifikasi",
    phCaptcha:"Masukkan kode", aShowPw:"Tampilkan kata sandi", aRefreshCap:"Muat ulang kode",
    loginH1:"Masuk ke akun Anda", loginSub:"Akses aset, laporan mutasi, dan laporan pribadi Anda.",
    keepSigned:"Biarkan saya tetap masuk", forgotQ:"Lupa kata sandi?",
    btnSignin:"Masuk", loadSignin:"Sedang masuk…",
    footLogin:'Belum punya akun? <a class="link" href="register.html">Buat akun</a>',
    kMembersOnly:"Khusus Anggota", qLogin:"Satu gembok. Satu pemilik. <em>Anda</em>.",
    regH1:"Buat akun Anda", regSub:"Anda memerlukan Sponsor ID dari anggota yang mengundang Anda.",
    pwHint:"Minimal 6 karakter. Lebih panjang dengan huruf besar-kecil, angka, dan simbol akan lebih kuat.",
    lConfirmPw:"Konfirmasi kata sandi", lSponsor:"Sponsor ID",
    btnCreate:"Buat Akun", loadCreate:"Membuat akun…",
    terms:"Dengan membuat akun, Anda menyetujui "+A("Ketentuan Layanan")+" dan "+A("Kebijakan Privasi")+".",
    footRegister:'Sudah punya akun? <a class="link" href="login.html">Masuk</a>',
    kByInv:"Hanya dengan Undangan", qRegister:"Gembok ini tercipta saat seseorang <em>menjamin</em> Anda.",
    fgH1:"Atur ulang kata sandi", fgSub:"Masukkan email akun Anda, kami akan mengirim tautan pengaturan ulang.",
    btnSend:"Kirim Tautan", loadSend:"Mengirim…",
    doneKicker:"Periksa kotak masuk Anda", doneH1:"Tautan terkirim",
    doneBody:"Jika email tersebut terdaftar di NASLAB, tautan pengaturan ulang sedang dikirim. Tautan kedaluwarsa dalam 60&nbsp;menit.",
    doneBack:"Kembali ke halaman masuk",
    footForgot:'Sudah ingat? <a class="link" href="login.html">Masuk</a>',
    kRecovery:"Pemulihan Akun", qForgot:"Gemboknya tetap. Hanya <em>kuncinya</em> yang diganti.",
    rsH1:"Atur kata sandi baru", rsSub:"Pilih kata sandi baru untuk akun NASLAB Anda.",
    lNewPw:"Kata sandi baru", pwHintShort:"Minimal 6 karakter.", lConfirmNewPw:"Konfirmasi kata sandi baru",
    btnSave:"Simpan Kata Sandi Baru", loadSave:"Menyimpan…",
    footReset:'Kembali ke <a class="link" href="login.html">halaman masuk</a>',
    kNewPw:"Kata Sandi Baru", qReset:"Kunci baru, pintu <em>yang sama</em>.",
    errEmailReq:"Masukkan alamat email Anda.", errEmailBad:"Alamat email tidak valid.",
    errPwReq:"Masukkan kata sandi Anda.", errPwShort:"Kata sandi minimal 6 karakter.",
    errPwConfirmReq:"Konfirmasi kata sandi Anda.", errPwMismatch:"Kedua kata sandi tidak cocok.",
    errCapReq:"Masukkan karakter yang ditampilkan.", pleaseWait:"Mohon tunggu…"
  },
  hi: {
    titleLogin:"NASLAB — सदस्य लॉगिन", titleRegister:"NASLAB — खाता बनाएँ",
    titleForgot:"NASLAB — पासवर्ड रीसेट", titleReset:"NASLAB — नया पासवर्ड",
    kMemberPortal:"सदस्य पोर्टल", backSignin:"← लॉगिन पर वापस जाएँ",
    lEmail:"ईमेल", lPassword:"पासवर्ड", lCaptcha:"कैप्चा",
    phCaptcha:"दिखाए गए अक्षर लिखें", aShowPw:"पासवर्ड दिखाएँ", aRefreshCap:"कैप्चा रीफ़्रेश करें",
    loginH1:"अपने खाते में लॉगिन करें", loginSub:"अपनी होल्डिंग्स, स्टेटमेंट और निजी रिपोर्ट देखें।",
    keepSigned:"मुझे लॉगिन रखें", forgotQ:"पासवर्ड भूल गए?",
    btnSignin:"लॉगिन", loadSignin:"लॉगिन हो रहा है…",
    footLogin:'खाता नहीं है? <a class="link" href="register.html">खाता बनाएँ</a>',
    kMembersOnly:"केवल सदस्यों के लिए", qLogin:"एक ताला। एक स्वामी। <em>आप</em>।",
    regH1:"अपना खाता बनाएँ", regSub:"आपको आमंत्रित करने वाले सदस्य की Sponsor ID चाहिए।",
    pwHint:"कम से कम 6 अक्षर। बड़े-छोटे अक्षर, अंक और चिह्न मिलाकर लंबा रखें तो अधिक सुरक्षित।",
    lConfirmPw:"पासवर्ड की पुष्टि करें", lSponsor:"Sponsor ID",
    btnCreate:"खाता बनाएँ", loadCreate:"खाता बन रहा है…",
    terms:"खाता बनाकर आप "+A("सेवा की शर्तों")+" और "+A("गोपनीयता नीति")+" से सहमत होते हैं।",
    footRegister:'पहले से खाता है? <a class="link" href="login.html">लॉगिन करें</a>',
    kByInv:"केवल आमंत्रण से", qRegister:"जिस पल कोई आपकी <em>ज़मानत</em> देता है, यह ताला बन जाता है।",
    fgH1:"पासवर्ड रीसेट करें", fgSub:"खाते का ईमेल दर्ज करें, हम रीसेट लिंक भेजेंगे।",
    btnSend:"रीसेट लिंक भेजें", loadSend:"भेजा जा रहा है…",
    doneKicker:"अपना इनबॉक्स देखें", doneH1:"रीसेट लिंक भेज दिया गया",
    doneBody:"यदि वह ईमेल NASLAB में पंजीकृत है, तो रीसेट लिंक रास्ते में है। लिंक 60&nbsp;मिनट में समाप्त हो जाएगा।",
    doneBack:"लॉगिन पर वापस जाएँ",
    footForgot:'याद आ गया? <a class="link" href="login.html">लॉगिन करें</a>',
    kRecovery:"खाता पुनर्प्राप्ति", qForgot:"ताला वही रहता है। बदलती है सिर्फ़ <em>चाबी</em>।",
    rsH1:"नया पासवर्ड सेट करें", rsSub:"अपने NASLAB खाते के लिए नया पासवर्ड चुनें।",
    lNewPw:"नया पासवर्ड", pwHintShort:"कम से कम 6 अक्षर।", lConfirmNewPw:"नए पासवर्ड की पुष्टि करें",
    btnSave:"नया पासवर्ड सहेजें", loadSave:"सहेजा जा रहा है…",
    footReset:'<a class="link" href="login.html">लॉगिन</a> पर वापस जाएँ',
    kNewPw:"नया पासवर्ड", qReset:"नई चाबी, <em>वही</em> दरवाज़ा।",
    errEmailReq:"कृपया अपना ईमेल पता दर्ज करें।", errEmailBad:"ईमेल पता मान्य नहीं लगता।",
    errPwReq:"कृपया पासवर्ड दर्ज करें।", errPwShort:"पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",
    errPwConfirmReq:"कृपया पासवर्ड की पुष्टि करें।", errPwMismatch:"दोनों पासवर्ड मेल नहीं खाते।",
    errCapReq:"कृपया दिखाए गए अक्षर दर्ज करें।", pleaseWait:"कृपया प्रतीक्षा करें…"
  },
  fa: {
    titleLogin:"NASLAB — ورود اعضا", titleRegister:"NASLAB — ساخت حساب",
    titleForgot:"NASLAB — بازنشانی رمز عبور", titleReset:"NASLAB — رمز عبور جدید",
    kMemberPortal:"پورتال اعضا", backSignin:"→ بازگشت به ورود",
    lEmail:"ایمیل", lPassword:"رمز عبور", lCaptcha:"کد امنیتی",
    phCaptcha:"نویسه‌های نمایش‌داده‌شده را وارد کنید", aShowPw:"نمایش رمز عبور", aRefreshCap:"تازه‌سازی کد",
    loginH1:"ورود به حساب شما", loginSub:"دارایی‌ها، صورت‌حساب‌ها و گزارش‌های اختصاصی خود را ببینید.",
    keepSigned:"مرا واردشده نگه دار", forgotQ:"رمز عبور را فراموش کرده‌اید؟",
    btnSignin:"ورود", loadSignin:"در حال ورود…",
    footLogin:'حساب ندارید؟ <a class="link" href="register.html">ساخت حساب</a>',
    kMembersOnly:"مخصوص اعضا", qLogin:"یک قفل. یک صاحب. <em>شما</em>.",
    regH1:"حساب خود را بسازید", regSub:"به شناسهٔ معرف (Sponsor ID) عضوی که شما را دعوت کرده نیاز دارید.",
    pwHint:"دست‌کم ۶ نویسه. هرچه بلندتر و با ترکیب حروف بزرگ و کوچک، عدد و نماد، امن‌تر.",
    lConfirmPw:"تأیید رمز عبور", lSponsor:"شناسهٔ معرف",
    btnCreate:"ساخت حساب", loadCreate:"در حال ساخت حساب…",
    terms:"با ساخت حساب، "+A("شرایط خدمات")+" و "+A("سیاست حریم خصوصی")+" را می‌پذیرید.",
    footRegister:'حساب دارید؟ <a class="link" href="login.html">ورود</a>',
    kByInv:"فقط با دعوت", qRegister:"این قفل همان لحظه‌ای ساخته می‌شود که کسی <em>ضمانت</em> شما را می‌کند.",
    fgH1:"بازنشانی رمز عبور", fgSub:"ایمیل حساب خود را وارد کنید تا پیوند بازنشانی برایتان ارسال شود.",
    btnSend:"ارسال پیوند بازنشانی", loadSend:"در حال ارسال…",
    doneKicker:"صندوق ورودی خود را بررسی کنید", doneH1:"پیوند بازنشانی ارسال شد",
    doneBody:"اگر این ایمیل در NASLAB ثبت شده باشد، پیوند بازنشانی در راه است. پیوند پس از 60&nbsp;دقیقه منقضی می‌شود.",
    doneBack:"بازگشت به ورود",
    footForgot:'به یاد آوردید؟ <a class="link" href="login.html">ورود</a>',
    kRecovery:"بازیابی حساب", qForgot:"قفل می‌ماند؛ تنها <em>کلید</em> عوض می‌شود.",
    rsH1:"تنظیم رمز عبور جدید", rsSub:"برای حساب NASLAB خود رمز عبور تازه‌ای برگزینید.",
    lNewPw:"رمز عبور جدید", pwHintShort:"دست‌کم ۶ نویسه.", lConfirmNewPw:"تأیید رمز عبور جدید",
    btnSave:"ذخیرهٔ رمز عبور جدید", loadSave:"در حال ذخیره…",
    footReset:'بازگشت به <a class="link" href="login.html">ورود</a>',
    kNewPw:"رمز عبور جدید", qReset:"کلیدی نو، <em>همان</em> در.",
    errEmailReq:"لطفاً ایمیل خود را وارد کنید.", errEmailBad:"نشانی ایمیل معتبر به نظر نمی‌رسد.",
    errPwReq:"لطفاً رمز عبور را وارد کنید.", errPwShort:"رمز عبور باید دست‌کم ۶ نویسه باشد.",
    errPwConfirmReq:"لطفاً رمز عبور را تأیید کنید.", errPwMismatch:"دو رمز عبور یکسان نیستند.",
    errCapReq:"لطفاً نویسه‌های نمایش‌داده‌شده را وارد کنید.", pleaseWait:"لطفاً صبر کنید…"
  },
  ar: {
    titleLogin:"NASLAB — تسجيل دخول الأعضاء", titleRegister:"NASLAB — إنشاء حساب",
    titleForgot:"NASLAB — إعادة تعيين كلمة المرور", titleReset:"NASLAB — كلمة مرور جديدة",
    kMemberPortal:"بوابة الأعضاء", backSignin:"→ العودة إلى تسجيل الدخول",
    lEmail:"البريد الإلكتروني", lPassword:"كلمة المرور", lCaptcha:"رمز التحقق",
    phCaptcha:"أدخل الأحرف الظاهرة", aShowPw:"إظهار كلمة المرور", aRefreshCap:"تحديث الرمز",
    loginH1:"تسجيل الدخول إلى حسابك", loginSub:"اطّلع على أصولك وكشوف حسابك وتقاريرك الخاصة.",
    keepSigned:"إبقائي مسجَّل الدخول", forgotQ:"نسيت كلمة المرور؟",
    btnSignin:"تسجيل الدخول", loadSignin:"جارٍ تسجيل الدخول…",
    footLogin:'ليس لديك حساب؟ <a class="link" href="register.html">إنشاء حساب</a>',
    kMembersOnly:"للأعضاء فقط", qLogin:"قفل واحد. مالك واحد. <em>أنت</em>.",
    regH1:"أنشئ حسابك", regSub:"تحتاج إلى معرِّف الراعي (Sponsor ID) من العضو الذي دعاك.",
    pwHint:"ستة أحرف على الأقل. كلما كانت أطول وجمعت حروفًا كبيرة وصغيرة وأرقامًا ورموزًا كانت أقوى.",
    lConfirmPw:"تأكيد كلمة المرور", lSponsor:"معرِّف الراعي",
    btnCreate:"إنشاء حساب", loadCreate:"جارٍ إنشاء الحساب…",
    terms:"بإنشائك حسابًا فإنك توافق على "+A("شروط الخدمة")+" و"+A("سياسة الخصوصية")+".",
    footRegister:'لديك حساب بالفعل؟ <a class="link" href="login.html">تسجيل الدخول</a>',
    kByInv:"بالدعوة فقط", qRegister:"يُصنع هذا القفل لحظة أن <em>يزكّيك</em> أحدهم.",
    fgH1:"إعادة تعيين كلمة المرور", fgSub:"أدخل بريد حسابك وسنرسل لك رابط إعادة التعيين.",
    btnSend:"إرسال رابط إعادة التعيين", loadSend:"جارٍ الإرسال…",
    doneKicker:"تفقّد بريدك الوارد", doneH1:"تم إرسال الرابط",
    doneBody:"إذا كان هذا البريد مسجلاً لدى NASLAB فرابط إعادة التعيين في الطريق إليك. تنتهي صلاحية الرابط خلال 60&nbsp;دقيقة.",
    doneBack:"العودة إلى تسجيل الدخول",
    footForgot:'تذكرتها؟ <a class="link" href="login.html">تسجيل الدخول</a>',
    kRecovery:"استعادة الحساب", qForgot:"يبقى القفل، ويُستبدل <em>المفتاح</em> وحده.",
    rsH1:"تعيين كلمة مرور جديدة", rsSub:"اختر كلمة مرور جديدة لحسابك في NASLAB.",
    lNewPw:"كلمة المرور الجديدة", pwHintShort:"ستة أحرف على الأقل.", lConfirmNewPw:"تأكيد كلمة المرور الجديدة",
    btnSave:"حفظ كلمة المرور الجديدة", loadSave:"جارٍ الحفظ…",
    footReset:'العودة إلى <a class="link" href="login.html">تسجيل الدخول</a>',
    kNewPw:"كلمة مرور جديدة", qReset:"مفتاح جديد، <em>الباب نفسه</em>.",
    errEmailReq:"يرجى إدخال بريدك الإلكتروني.", errEmailBad:"البريد الإلكتروني غير صالح.",
    errPwReq:"يرجى إدخال كلمة المرور.", errPwShort:"يجب ألا تقل كلمة المرور عن 6 أحرف.",
    errPwConfirmReq:"يرجى تأكيد كلمة المرور.", errPwMismatch:"كلمتا المرور غير متطابقتين.",
    errCapReq:"يرجى إدخال الأحرف الظاهرة.", pleaseWait:"يرجى الانتظار…"
  },
  tr: {
    titleLogin:"NASLAB — Üye Girişi", titleRegister:"NASLAB — Hesap Oluştur",
    titleForgot:"NASLAB — Parola Sıfırlama", titleReset:"NASLAB — Yeni Parola",
    kMemberPortal:"Üye Portalı", backSignin:"← Girişe dön",
    lEmail:"E-posta", lPassword:"Parola", lCaptcha:"Doğrulama kodu",
    phCaptcha:"Görünen karakterleri girin", aShowPw:"Parolayı göster", aRefreshCap:"Kodu yenile",
    loginH1:"Hesabınıza giriş yapın", loginSub:"Varlıklarınıza, ekstrelerinize ve özel raporlarınıza erişin.",
    keepSigned:"Oturumumu açık tut", forgotQ:"Parolanızı mı unuttunuz?",
    btnSignin:"Giriş Yap", loadSignin:"Giriş yapılıyor…",
    footLogin:'Hesabınız yok mu? <a class="link" href="register.html">Hesap oluşturun</a>',
    kMembersOnly:"Üyelere Özel", qLogin:"Tek kilit. Tek sahip. <em>Siz</em>.",
    regH1:"Hesabınızı oluşturun", regSub:"Sizi davet eden üyeden bir Sponsor ID almanız gerekir.",
    pwHint:"En az 6 karakter. Büyük-küçük harf, rakam ve sembol içeren daha uzun parolalar daha güçlüdür.",
    lConfirmPw:"Parolayı doğrula", lSponsor:"Sponsor ID",
    btnCreate:"Hesap Oluştur", loadCreate:"Hesap oluşturuluyor…",
    terms:"Hesap oluşturarak "+A("Hizmet Şartları")+" ve "+A("Gizlilik Politikası")+" belgelerini kabul etmiş olursunuz.",
    footRegister:'Zaten hesabınız var mı? <a class="link" href="login.html">Giriş yapın</a>',
    kByInv:"Yalnızca Davetle", qRegister:"Bu kilit, biri size <em>kefil olduğu</em> anda kurulur.",
    fgH1:"Parolanızı sıfırlayın", fgSub:"Hesap e-postanızı girin, size sıfırlama bağlantısı gönderelim.",
    btnSend:"Sıfırlama Bağlantısı Gönder", loadSend:"Gönderiliyor…",
    doneKicker:"Gelen kutunuzu kontrol edin", doneH1:"Bağlantı gönderildi",
    doneBody:"Bu e-posta NASLAB'da kayıtlıysa sıfırlama bağlantısı yola çıktı. Bağlantı 60&nbsp;dakika içinde geçerliliğini yitirir.",
    doneBack:"Girişe dön",
    footForgot:'Hatırladınız mı? <a class="link" href="login.html">Giriş yapın</a>',
    kRecovery:"Hesap Kurtarma", qForgot:"Kilit yerinde durur; değişen yalnızca <em>anahtardır</em>.",
    rsH1:"Yeni parola belirleyin", rsSub:"NASLAB hesabınız için yeni bir parola seçin.",
    lNewPw:"Yeni parola", pwHintShort:"En az 6 karakter.", lConfirmNewPw:"Yeni parolayı doğrula",
    btnSave:"Yeni Parolayı Kaydet", loadSave:"Kaydediliyor…",
    footReset:'<a class="link" href="login.html">Girişe</a> dön',
    kNewPw:"Yeni Parola", qReset:"Yeni anahtar, <em>aynı</em> kapı.",
    errEmailReq:"Lütfen e-posta adresinizi girin.", errEmailBad:"Geçerli bir e-posta adresi değil.",
    errPwReq:"Lütfen parolanızı girin.", errPwShort:"Parola en az 6 karakter olmalıdır.",
    errPwConfirmReq:"Lütfen parolanızı doğrulayın.", errPwMismatch:"Parolalar eşleşmiyor.",
    errCapReq:"Lütfen görünen karakterleri girin.", pleaseWait:"Lütfen bekleyin…"
  },
  es: {
    titleLogin:"NASLAB — Acceso de socios", titleRegister:"NASLAB — Crear cuenta",
    titleForgot:"NASLAB — Restablecer contraseña", titleReset:"NASLAB — Nueva contraseña",
    kMemberPortal:"Portal de socios", backSignin:"← Volver al acceso",
    lEmail:"Correo electrónico", lPassword:"Contraseña", lCaptcha:"Código de verificación",
    phCaptcha:"Escriba los caracteres", aShowPw:"Mostrar contraseña", aRefreshCap:"Actualizar código",
    loginH1:"Acceda a su cuenta", loginSub:"Consulte sus posiciones, extractos e informes privados.",
    keepSigned:"Mantener la sesión iniciada", forgotQ:"¿Olvidó su contraseña?",
    btnSignin:"Acceder", loadSignin:"Accediendo…",
    footLogin:'¿No tiene cuenta? <a class="link" href="register.html">Crear una cuenta</a>',
    kMembersOnly:"Solo socios", qLogin:"Un candado. Un titular. <em>Usted</em>.",
    regH1:"Cree su cuenta", regSub:"Necesitará el Sponsor ID del socio que le invitó.",
    pwHint:"Mínimo 6 caracteres. Más larga y con mayúsculas, minúsculas, números y símbolos, más segura.",
    lConfirmPw:"Confirmar contraseña", lSponsor:"Sponsor ID",
    btnCreate:"Crear cuenta", loadCreate:"Creando cuenta…",
    terms:"Al crear una cuenta acepta los "+A("Términos del Servicio")+" y la "+A("Política de Privacidad")+".",
    footRegister:'¿Ya tiene cuenta? <a class="link" href="login.html">Acceda</a>',
    kByInv:"Solo por invitación", qRegister:"El candado se forja en el instante en que alguien <em>responde</em> por usted.",
    fgH1:"Restablezca su contraseña", fgSub:"Introduzca el correo de su cuenta y le enviaremos un enlace.",
    btnSend:"Enviar enlace", loadSend:"Enviando…",
    doneKicker:"Revise su bandeja de entrada", doneH1:"Enlace enviado",
    doneBody:"Si ese correo está registrado en NASLAB, el enlace va de camino. Caduca en 60&nbsp;minutos.",
    doneBack:"Volver al acceso",
    footForgot:'¿La recordó? <a class="link" href="login.html">Acceda</a>',
    kRecovery:"Recuperación de cuenta", qForgot:"El candado permanece. Solo se cambia la <em>llave</em>.",
    rsH1:"Establezca una nueva contraseña", rsSub:"Elija una nueva contraseña para su cuenta NASLAB.",
    lNewPw:"Nueva contraseña", pwHintShort:"Mínimo 6 caracteres.", lConfirmNewPw:"Confirmar nueva contraseña",
    btnSave:"Guardar nueva contraseña", loadSave:"Guardando…",
    footReset:'Volver al <a class="link" href="login.html">acceso</a>',
    kNewPw:"Nueva contraseña", qReset:"Una llave nueva, la <em>misma</em> puerta.",
    errEmailReq:"Introduzca su correo electrónico.", errEmailBad:"No parece un correo válido.",
    errPwReq:"Introduzca su contraseña.", errPwShort:"La contraseña debe tener al menos 6 caracteres.",
    errPwConfirmReq:"Confirme su contraseña.", errPwMismatch:"Las contraseñas no coinciden.",
    errCapReq:"Escriba los caracteres mostrados.", pleaseWait:"Espere…"
  },
  it: {
    titleLogin:"NASLAB — Accesso soci", titleRegister:"NASLAB — Crea account",
    titleForgot:"NASLAB — Reimposta password", titleReset:"NASLAB — Nuova password",
    kMemberPortal:"Portale soci", backSignin:"← Torna all'accesso",
    lEmail:"Email", lPassword:"Password", lCaptcha:"Codice di verifica",
    phCaptcha:"Inserisci i caratteri", aShowPw:"Mostra password", aRefreshCap:"Aggiorna codice",
    loginH1:"Accedi al tuo account", loginSub:"Consulta posizioni, estratti conto e report riservati.",
    keepSigned:"Resta collegato", forgotQ:"Password dimenticata?",
    btnSignin:"Accedi", loadSignin:"Accesso in corso…",
    footLogin:'Non hai un account? <a class="link" href="register.html">Crea un account</a>',
    kMembersOnly:"Riservato ai soci", qLogin:"Un lucchetto. Un titolare. <em>Tu</em>.",
    regH1:"Crea il tuo account", regSub:"Ti serve lo Sponsor ID del socio che ti ha invitato.",
    pwHint:"Almeno 6 caratteri. Più lunga e con maiuscole, minuscole, numeri e simboli è più sicura.",
    lConfirmPw:"Conferma password", lSponsor:"Sponsor ID",
    btnCreate:"Crea account", loadCreate:"Creazione in corso…",
    terms:"Creando un account accetti i "+A("Termini di Servizio")+" e l'"+A("Informativa sulla Privacy")+".",
    footRegister:'Hai già un account? <a class="link" href="login.html">Accedi</a>',
    kByInv:"Solo su invito", qRegister:"Il lucchetto nasce nell'istante in cui qualcuno <em>garantisce</em> per te.",
    fgH1:"Reimposta la password", fgSub:"Inserisci l'email del tuo account: ti invieremo un link di reimpostazione.",
    btnSend:"Invia link", loadSend:"Invio in corso…",
    doneKicker:"Controlla la posta", doneH1:"Link inviato",
    doneBody:"Se l'email è registrata su NASLAB, il link è in arrivo. Scade tra 60&nbsp;minuti.",
    doneBack:"Torna all'accesso",
    footForgot:'Ricordata? <a class="link" href="login.html">Accedi</a>',
    kRecovery:"Recupero account", qForgot:"Il lucchetto resta. Cambia solo la <em>chiave</em>.",
    rsH1:"Imposta una nuova password", rsSub:"Scegli una nuova password per il tuo account NASLAB.",
    lNewPw:"Nuova password", pwHintShort:"Almeno 6 caratteri.", lConfirmNewPw:"Conferma nuova password",
    btnSave:"Salva nuova password", loadSave:"Salvataggio…",
    footReset:'Torna all\'<a class="link" href="login.html">accesso</a>',
    kNewPw:"Nuova password", qReset:"Una chiave nuova, la <em>stessa</em> porta.",
    errEmailReq:"Inserisci il tuo indirizzo email.", errEmailBad:"L'indirizzo email non sembra valido.",
    errPwReq:"Inserisci la password.", errPwShort:"La password deve avere almeno 6 caratteri.",
    errPwConfirmReq:"Conferma la password.", errPwMismatch:"Le due password non coincidono.",
    errCapReq:"Inserisci i caratteri mostrati.", pleaseWait:"Attendere…"
  },
  de: {
    titleLogin:"NASLAB — Mitglieder-Login", titleRegister:"NASLAB — Konto erstellen",
    titleForgot:"NASLAB — Passwort zurücksetzen", titleReset:"NASLAB — Neues Passwort",
    kMemberPortal:"Mitgliederportal", backSignin:"← Zurück zur Anmeldung",
    lEmail:"E-Mail", lPassword:"Passwort", lCaptcha:"Sicherheitscode",
    phCaptcha:"Angezeigte Zeichen eingeben", aShowPw:"Passwort anzeigen", aRefreshCap:"Code aktualisieren",
    loginH1:"In Ihr Konto einloggen", loginSub:"Zugriff auf Ihre Bestände, Abrechnungen und persönlichen Berichte.",
    keepSigned:"Angemeldet bleiben", forgotQ:"Passwort vergessen?",
    btnSignin:"Anmelden", loadSignin:"Anmeldung läuft…",
    footLogin:'Noch kein Konto? <a class="link" href="register.html">Konto erstellen</a>',
    kMembersOnly:"Nur für Mitglieder", qLogin:"Ein Schloss. Ein Inhaber. <em>Sie</em>.",
    regH1:"Konto erstellen", regSub:"Sie benötigen die Sponsor-ID des Mitglieds, das Sie eingeladen hat.",
    pwHint:"Mindestens 6 Zeichen. Länger und mit Groß-/Kleinbuchstaben, Zahl und Symbol ist sicherer.",
    lConfirmPw:"Passwort bestätigen", lSponsor:"Sponsor-ID",
    btnCreate:"Konto erstellen", loadCreate:"Konto wird erstellt…",
    terms:"Mit der Kontoerstellung stimmen Sie den "+A("Nutzungsbedingungen")+" und der "+A("Datenschutzerklärung")+" zu.",
    footRegister:'Bereits ein Konto? <a class="link" href="login.html">Anmelden</a>',
    kByInv:"Nur auf Einladung", qRegister:"Das Schloss entsteht in dem Moment, in dem jemand für Sie <em>bürgt</em>.",
    fgH1:"Passwort zurücksetzen", fgSub:"Geben Sie die E-Mail Ihres Kontos ein, wir senden Ihnen einen Link.",
    btnSend:"Link senden", loadSend:"Wird gesendet…",
    doneKicker:"Prüfen Sie Ihren Posteingang", doneH1:"Link gesendet",
    doneBody:"Ist diese E-Mail bei NASLAB registriert, ist der Link unterwegs. Er läuft in 60&nbsp;Minuten ab.",
    doneBack:"Zurück zur Anmeldung",
    footForgot:'Wieder eingefallen? <a class="link" href="login.html">Anmelden</a>',
    kRecovery:"Kontowiederherstellung", qForgot:"Das Schloss bleibt. Nur der <em>Schlüssel</em> wird ersetzt.",
    rsH1:"Neues Passwort festlegen", rsSub:"Wählen Sie ein neues Passwort für Ihr NASLAB-Konto.",
    lNewPw:"Neues Passwort", pwHintShort:"Mindestens 6 Zeichen.", lConfirmNewPw:"Neues Passwort bestätigen",
    btnSave:"Neues Passwort speichern", loadSave:"Wird gespeichert…",
    footReset:'Zurück zur <a class="link" href="login.html">Anmeldung</a>',
    kNewPw:"Neues Passwort", qReset:"Ein neuer Schlüssel, <em>dieselbe</em> Tür.",
    errEmailReq:"Bitte geben Sie Ihre E-Mail-Adresse ein.", errEmailBad:"Das scheint keine gültige E-Mail-Adresse zu sein.",
    errPwReq:"Bitte geben Sie Ihr Passwort ein.", errPwShort:"Das Passwort muss mindestens 6 Zeichen haben.",
    errPwConfirmReq:"Bitte bestätigen Sie Ihr Passwort.", errPwMismatch:"Die Passwörter stimmen nicht überein.",
    errCapReq:"Bitte geben Sie die angezeigten Zeichen ein.", pleaseWait:"Bitte warten…"
  }
  };

  var RTL = { ar: 1, fa: 1 };
  var CODES = Object.keys(D);

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && D[q]) { try { localStorage.setItem("naslab-lang", q); } catch (e) {} return q; }
    var m = location.pathname.match(/\/lang\/([a-z]{2})\b/);   /* 线上 /lang/xx 也认 */
    if (m && D[m[1]]) return m[1];
    try { var s = localStorage.getItem("naslab-lang"); if (s && D[s]) return s; } catch (e) {}
    return "en";
  }

  function T(key) {
    var lang = document.documentElement.getAttribute("lang") || "en";
    return (D[lang] && D[lang][key]) || D.en[key] || key;
  }
  window.NASLAB_T = T;   /* auth.js 的校验文案从这里取 */

  function apply(lang) {
    var d = D[lang] || D.en;
    var html = document.documentElement;
    html.setAttribute("lang", lang === "cn" ? "zh-CN" : lang);
    html.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");
    /* T() 要用原始 code,单独存一份 */
    html.setAttribute("data-lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in d) && !(k in D.en)) return;
      el.textContent = d[k] != null ? d[k] : D.en[k];
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      el.innerHTML = d[k] != null ? d[k] : D.en[k];
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-ph");
      el.setAttribute("placeholder", d[k] != null ? d[k] : D.en[k]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-aria");
      el.setAttribute("aria-label", d[k] != null ? d[k] : D.en[k]);
    });
    document.querySelectorAll("[data-i18n-loading]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-loading");
      el.setAttribute("data-loading", d[k] != null ? d[k] : D.en[k]);
    });
    /* 文案里带 <a> 的句子刚被整段重写 —— 把预览域的链接改写再跑一遍 */
    if (window.NASLAB_REWRITE_LINKS) window.NASLAB_REWRITE_LINKS();
    /* 菜单当前项 + 按钮标 */
    document.querySelectorAll(".langwrap").forEach(function (wrap) {
      var span = wrap.querySelector(".lang > span");
      if (span) span.textContent = lang.toUpperCase();
      wrap.querySelectorAll(".langmenu a").forEach(function (a) {
        var code = (a.getAttribute("href").match(/\/lang\/([a-z]{2})/) || [])[1];
        a.classList.toggle("is-current", code === lang);
      });
    });
  }

  /* T() 用 data-lang(cn),html lang 是标准码(zh-CN)—— 重写 T 读 data-lang */
  window.NASLAB_T = function (key) {
    var lang = document.documentElement.getAttribute("data-lang") || "en";
    return (D[lang] && D[lang][key]) || D.en[key] || key;
  };

  var lang = pick();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { apply(lang); });
  } else {
    apply(lang);
  }

  /* MENU 拦截:静态稿在本页换语言。[接线] 线上走 /lang/{code} 时删掉这一段。 */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest(".langmenu a");
    if (!a) return;
    var code = (a.getAttribute("href").match(/\/lang\/([a-z]{2})/) || [])[1];
    if (!code || !D[code]) return;
    e.preventDefault();
    try { localStorage.setItem("naslab-lang", code); } catch (err) {}
    apply(code);
    var menu = a.closest(".langmenu");
    if (menu) { menu.hidden = true; }
    var url = new URL(location.href); url.searchParams.set("lang", code);
    history.replaceState(null, "", url);
  });
})();
