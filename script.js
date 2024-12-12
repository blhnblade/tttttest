function chatWidget(){
    const globalThis = this;
  
    this.config = {}
  
    this.init = ()=>{
      this.insertChat()
      this.loadMessageHistory()
      this.autoSizeWidth()
      this.sendingToChat()
      this.sendingUsingEnter()
      this.textareaCancelNewlineOn()
      this.openChat()
      this.closeChat()
      this.textareaAutoSizeWidth()
      this.resizeChatWidth()
      this.textareaAutoHeight()
      this.checkFirstOpening.init()
      this.chatAutoStart.init()
      this.iconForUnreadMessage.checkNotifLocaleStorage()
      this.insertMetaTag()
    },
  
    this.checkFirstOpening = {
      init(){
        this.setHandler()
      },
      isOpened: false,
      setHandler(){
        globalThis.chatBubble.addEventListener('click', this.handler)
      },
      handler(){
        globalThis.checkFirstOpening.isOpened = true
        this.removeEventListener('click', globalThis.checkFirstOpening.handler)
      }
    }
  
    this.insertChat = (colorSettings)=>{
      document.head.insertAdjacentHTML('beforeend', '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">');  
      const style = document.createElement('style');
      style.innerHTML = `
      .chat-widget-container * {
        font-family: 'Inter', 'Segoe UI';
        box-sizing: border-box;
        padding: 0px;
        margin: 0px;
        border: none;
        width: auto;
        min-width: auto;
        max-width: auto;
        min-height: auto;
        max-height: auto;
        height: auto;
        background: none;
        box-shadow: none;
        color: initial;
      }
      .chat-widget-container textarea:focus{
        outline: none;
        border: none;
        background-color: #F2F3F7;
        box-shadow: none;
      }
      .hidden {
        display: none!important;
      }
      .chat-widget-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        flex-direction: column;
        z-index: 1000;
      }
      .chat-bubble{
        font-size: 30px;
        line-height: 36px;
        border-radius: 100%;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: ${this.config?.circle_color || 'gray'};
        animation-name: opacity-emergence;
        animation-duration: .2s;
        position: relative;
      }
      .chat-bubble svg{
        width: 30px;
        height: 30px;
        color: rgba(255,255,255,1);
        display: block;
        vertical-align: middle;
      }
      .chat-bubble-container{
        display: flex;
        align-items: center;
        column-gap: 12px;
        padding: 4px 16px 4px 4px;
        background: #FFFFFF;
        box-shadow: 0px 3.75px 10px 0px #18182A14, -2.5px 1.88px 3.75px 0px #0219551F, 5px 5.63px 17.5px 0px #18182A0D;
        border-radius: 39px;
        cursor: pointer;
      }
      .chat-bubble-text{
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: #18182A;
        user-select: none;
      }
      .semi-bold{
        font-weight: 600;
      }
      .chat-unread-message-icon{
        position: absolute;
        top: 0;
        right: 0;
        width: 20px;
        min-width: 20px;
        max-width: 20px;
        height: 20px;
        max-height: 20px;
        min-height: 20px;
        border-radius: 50%;
        background-color: #00D35B;
        animation-name: opacity-emergence;
        animation-duration: .2s;
      }
      .chat-popup{
        height: 70vh;
        max-height: 70vh;
        transition: all 0.3s;
        overflow: hidden;
        transition-property: all;
        transition-timing-function: cubic-bezier(0.4,0,0.2,1);
        transition-duration: 150ms;
        box-shadow: 0 0 #0000, 0 0 #0000, 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
        font-size: 14px;
        line-height: 20px;
        background-color: rgba(255,255,255, 1);
        width: 384px;
        max-width: 384px;
        min-width: 384px;
        display: flex;
        flex-direction: column;
        position: absolute;
        bottom: 80px;
        right: 0;
      }
      .chat-header{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        background-color: ${this.config?.header_color || 'gray'}
      }
      .chat-header h3{
        font-size: 18px;
        line-height: 28px;
        font-weight: 500;
        margin: 0;
        color: white;
        user-select: none;
      }
      .chat-header #close-popup{
        min-width: 24px !important;
        width: 24px !important;
        height: 24px !important;
        min-height: 24px !important;
        color: rgba(255,255,255,1);
        border-style: none;
        cursor: pointer;
        background-color: transparent;
        background-image: none;
        text-transform: none;
        -webkit-appearance: button;
        font-family: inherit;
        font-size: 100%;
        margin: 0;
        padding: 0px;
        text-indent: 0px;
        text-shadow: none;
        display: flex;
        align-items:center;
        justify-content: center
        letter-spacing: normal;
        word-spacing: normal;
        text-rendering: auto;
      }
      .chat-header button svg{
        width: 24px;
        height: 24px;
      }
      .chat-messages{
        flex: 1 1 0%;
        padding: 16px;
        overflow-y: auto;
        scrollbar-width: none;
        scrollbar-color: #888 #F2F3F7;
      }
      .chat-messages::-webkit-scrollbar {
        width: 3px;
      }
      .chat-messages::-webkit-scrollbar-track {
        background-color: white;
      }
      .chat-messages::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 6px;
      }
      .chat-input-container{
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        border-top: 1px solid var(--border-border-gray-200, #E5E7EB);
        border-top-width: 1px;
        border-color: rgba(229,231,235,1);
        padding: 16px;
        background: #FFF;
      }
      .chat-input-container-inner{
        display: flex;
        column-gap: 16px;
      }
      .chat-input{
        flex-grow: 1;
        background-color: #F2F3F7;
        border-radius: 8px;
        font-size: 14px;
        line-height: 20px;
        font-weight: 400;
        padding: 8px 16px;
        outline: none;
        border: none;
        resize: none;
        height: 36px;
        max-height: 136px;
        overflow-y: auto;
        word-break: break-word;
        scrollbar-width: thin;
        scrollbar-color: #888 #F2F3F7;
        user-select: none;
      }
      .chat-input::-webkit-scrollbar {
        width: 3px;
      }
      .chat-input::-webkit-scrollbar-track {
        background-color: white;
      }
      .chat-input::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 6px;
      }
      .chat-submit{
        min-width: 36px !important;
        width: 36px !important;
        height: 36px !important;
        min-height: 36px !important;
        padding: 6px;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        background-color: ${this.config?.send_button_color || 'gray'};
        border: none;
        align-self: flex-end;
        cursor: pointer;
      }
      .chat-submit svg{
        width: 24px;
        height: 24px;
        fill: white;
      }
      .chat-message-user{
        max-width: 80%;
        color: rgba(255,255,255,1);
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 16px;
        padding-right: 16px;
        background-color: rgba(31,41,55,1);
        word-break: break-word;
        border-radius: 8px 8px 2px 8px;
        background-color: ${this.config?.user_message_color || 'gray'};
      }
      .chat-message-user-container{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 12px;
      }
      .chat-message-bot-container{
        display: flex;
        margin-bottom: 12px;
      }
      .chat-message-bot{
        max-width: 80%;
        min-height: 36px;
        color: rgba(0,0,0,1);
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 16px;
        padding-right: 16px;
        background-color: rgba(229,231,235,1);
        word-break: break-word;
        border-radius: 8px 8px 8px 2px;
        background: #F2F3F7;
      }
      @media (max-width: 768px) {
        .chat-popup {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          max-height: 100%;
          border-radius: 0;
          max-width: initial;
          min-width: initial;
        }
        .chat-header{
          border-radius: 0px;
        }
      }
      .chat-online{
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
      @keyframes opacity-emergence{
        0%{
          opacity: 0;
        }
        100%{
          opacity: 1
        }
      }
      .chat-prints ~ .chat-online{
        display: none;
      }
      .chat-prints{
        display: flex;
        align-items: center;
        color: #fff;
      }
      .chat-prints-circle-container{
          display: flex;
          align-items: center;
          column-gap: 4px;
          margin-right: 5px;
      }
  
      .chat-prints-circle{
          min-width: 3px;
          width: 3px;
          max-width: 3px;
          height: 3px;
          max-height: 3px;
          min-height: 3px;
          border-radius: 50%;
          background-color: #fff;
      }
  
      .chat-prints-circle-first{
          animation-name: chat-prints-circle-first;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
      }
      .chat-prints-circle-second{
          animation-name: chat-prints-circle-second;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
      }
      .chat-prints-circle-third{
          animation-name: chat-prints-circle-third;
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
      }
      .chat-lath{
        display: flex;
        align-items: center;
        align-self: center;
        column-gap: 4px;
        text-decoration: none;
      }
  
      .chat-lath-text{
        font-size: 12px;
        font-weight: 500;
        color: #A9ABBA;
        line-height: 16px;
      }
  
      @keyframes chat-prints-circle-first{
          0%{
              transform: scale(1);
          }
          16.5%{
              transform: scale(1.5);
          }
          33%{
              transform: scale(1);
          }
          100%{
              transform: scale(1);
          }
          
      }
      @keyframes chat-prints-circle-second{
          0%{
              transform: scale(1);
          }
          33%{
              transform: scale(1);
          }
          49.5%{
              transform: scale(1.5);
          }
          66%{
              transform: scale(1);
          }
          100%{
              transform: scale(1);
          }
      }
      @keyframes chat-prints-circle-third{
          0%{
              transform: scale(1);
          }
          66%{
              transform: scale(1);
          }
          80.5%{
              transform: scale(1.5);
          }
          99%{
              transform: scale(1);
          }
          100%{
              transform: scale(1);
          }
      }
      #close-popup svg path {
        stroke: #FFF;
      }
      `;
  
      document.head.appendChild(style);
  
      // Create chat widget container
      const chatWidgetContainer = document.createElement('div');
      chatWidgetContainer.id = 'chat-widget-container';
      chatWidgetContainer.classList.add('chat-widget-container')
      document.body.appendChild(chatWidgetContainer);
      
      // Inject the HTML
      chatWidgetContainer.innerHTML = `
        <div id="chat-bubble-container" class="chat-bubble-container">
  
          <div id="chat-bubble" class="chat-bubble">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M46.7248 23.7621C46.7655 23.5408 47.0876 23.555 47.0813 23.7799C46.7649 35.0292 37.1986 44.2315 25.7341 44.4598C15.3973 44.7925 6.64351 36.1485 6.73112 25.8192C6.70736 19.174 11.1162 13.1659 17.4822 11.2354C19.3746 10.6505 21.3655 10.453 23.3359 10.6548C27.9556 11.1166 32.0971 14.4519 33.5093 18.8741C34.2874 21.3183 34.3379 24.0476 33.2925 26.4057C32.7908 27.5515 32.0592 28.5819 31.143 29.4333C30.2267 30.2847 29.1454 30.9388 27.966 31.3551C27.5182 31.5107 27.0595 31.6286 26.5947 31.7081C26.3737 31.7459 26.3386 31.4274 26.5506 31.3547C26.9597 31.2144 27.3589 31.044 27.7447 30.8443C33.1247 28.0229 33.5955 21.302 29.8088 16.9674C28.7896 15.8027 27.5072 14.898 26.0681 14.3285C24.6291 13.759 23.0748 13.5412 21.5346 13.693C15.3186 14.1638 10.3262 19.5853 10.4198 25.8133C10.399 34.1424 17.3812 41.184 25.7237 41.2731C36.1982 41.5083 44.8782 33.7997 46.7248 23.7621Z" fill="white" fill-opacity="0.5"/>
              <path d="M12.2217 4.37345C12.0097 4.44882 11.8609 4.16276 12.0588 4.05581C21.9591 -1.29488 34.7118 2.38863 40.6418 12.203C46.0982 20.9886 42.9893 32.8916 34 37.9804C28.257 41.3236 20.8494 40.5095 15.9945 35.9616C14.5418 34.6152 13.3753 32.9898 12.5649 31.1824C10.655 26.9507 11.4726 21.6965 14.5962 18.2624C16.3239 16.3664 18.6624 14.958 21.2273 14.6843C22.4703 14.5459 23.7285 14.6643 24.924 15.0321C26.1194 15.3999 27.2265 16.0093 28.1768 16.8225C28.5355 17.1325 28.8669 17.4708 29.1682 17.8336C29.3114 18.0061 29.0531 18.1958 28.8841 18.0485C28.5581 17.7643 28.2109 17.5038 27.845 17.2695C22.7116 14.021 16.6558 16.9738 14.7952 22.4204C14.2962 23.8854 14.1539 25.4484 14.3803 26.9794C14.6066 28.5104 15.195 29.9653 16.0967 31.2232C19.6123 36.3711 26.8038 37.9839 32.1505 34.7889C39.3741 30.6424 41.9813 21.0747 37.8872 13.8054C32.8536 4.61659 21.8378 0.953853 12.2217 4.37345Z" fill="white" fill-opacity="0.7"/>
              <path d="M12.773 44.0069C12.9442 44.1527 12.7709 44.4246 12.5793 44.3067C2.99533 38.4081 -0.190969 25.5223 5.34354 15.4795C10.2239 6.36132 22.0866 3.10225 30.9883 8.3428C36.7551 11.6448 39.7539 18.467 38.2427 24.9454C37.8031 26.8767 36.9786 28.6996 35.8186 30.3051C33.1088 34.075 28.1497 35.9941 23.6139 35.006C21.108 34.4577 18.7191 33.1368 17.1996 31.0524C16.4583 30.0451 15.9317 28.8962 15.6525 27.677C15.3733 26.4579 15.3475 25.1943 15.5766 23.9648C15.6657 23.4992 15.793 23.043 15.9566 22.6007C16.0344 22.3904 16.3278 22.5193 16.2847 22.7393C16.2016 23.1637 16.1496 23.5946 16.1296 24.0286C15.8831 30.0985 21.4682 33.8666 27.1154 32.7546C28.6336 32.4543 30.0583 31.796 31.271 30.8345C32.4838 29.873 33.4495 28.6359 34.0881 27.2261C36.7884 21.6075 34.5894 14.5732 29.1491 11.5402C21.9463 7.35766 12.3569 9.88365 8.10851 17.0639C2.66761 26.0175 5.00348 37.3889 12.773 44.0069Z" fill="#1D1D1B"/>
              <path d="M12.773 44.0069C12.9442 44.1527 12.7709 44.4246 12.5793 44.3067C2.99533 38.4081 -0.190969 25.5223 5.34354 15.4795C10.2239 6.36132 22.0866 3.10225 30.9883 8.3428C36.7551 11.6448 39.7539 18.467 38.2427 24.9454C37.8031 26.8767 36.9786 28.6996 35.8186 30.3051C33.1088 34.075 28.1497 35.9941 23.6139 35.006C21.108 34.4577 18.7191 33.1368 17.1996 31.0524C16.4583 30.0451 15.9317 28.8962 15.6525 27.677C15.3733 26.4579 15.3475 25.1943 15.5766 23.9648C15.6657 23.4992 15.793 23.043 15.9566 22.6007C16.0344 22.3904 16.3278 22.5193 16.2847 22.7393C16.2016 23.1637 16.1496 23.5946 16.1296 24.0286C15.8831 30.0985 21.4682 33.8666 27.1154 32.7546C28.6336 32.4543 30.0583 31.796 31.271 30.8345C32.4838 29.873 33.4495 28.6359 34.0881 27.2261C36.7884 21.6075 34.5894 14.5732 29.1491 11.5402C21.9463 7.35766 12.3569 9.88365 8.10851 17.0639C2.66761 26.0175 5.00348 37.3889 12.773 44.0069Z" fill="white"/>
            </svg>
            <div id="chat-unread-message-icon" class="chat-unread-message-icon hidden"></div>
          </div>
          <div class="chat-bubble-text">Let’s chat</div>
        </div>
        <div id="chat-popup" class="chat-popup hidden ">
        <div id="chat-header" class="chat-header">
            <div>
              <h3>${this.config.chat_title}</h3>
              <div class="chat-status">
                <div class="chat-online">Online</div>
              </div>
              
            </div>
            <button id="close-popup">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div id="chat-messages" class="chat-messages">
            <div id="chat-history" class="chat-history"></div>
          </div>
          <div id="chat-input-container" class="chat-input-container">
            <div class="chat-input-container-inner">
              <textarea id="chat-input" class="chat-input" placeholder="Send a message..."></textarea>
              <button id="chat-submit" class="chat-submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
            <a href="#" class="chat-lath" target="_blank">
              <div class="chat-lath-text">Powered by</div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M15.5756 7.91809C15.5891 7.84434 15.6965 7.84906 15.6944 7.92402C15.589 11.6738 12.4002 14.7412 8.57868 14.8173C5.13309 14.9282 2.21515 12.0469 2.24436 8.60379C2.23644 6.38873 3.70605 4.38602 5.82805 3.74254C6.45885 3.54755 7.12248 3.48173 7.77928 3.549C9.31918 3.70294 10.6997 4.81468 11.1704 6.28875C11.4298 7.10349 11.4466 8.01328 11.0982 8.79931C10.9309 9.18121 10.6871 9.5247 10.3816 9.80849C10.0762 10.0923 9.71578 10.3103 9.32265 10.4491C9.17339 10.501 9.02048 10.5403 8.86554 10.5668C8.79188 10.5794 8.78018 10.4732 8.85087 10.449C8.98723 10.4022 9.12029 10.3454 9.2489 10.2788C11.0422 9.33835 11.1991 7.09805 9.93692 5.65319C9.5972 5.26495 9.16972 4.96339 8.69003 4.77356C8.21033 4.58373 7.69227 4.51112 7.17887 4.56174C5.10686 4.71865 3.44272 6.52584 3.4739 8.60181C3.46697 11.3782 5.79439 13.7254 8.57522 13.7551C12.0667 13.8335 14.96 11.264 15.5756 7.91809Z" fill="#A9ABBA"/>
                <path d="M4.07389 1.45652C4.00324 1.48164 3.95363 1.38628 4.0196 1.35063C7.31972 -0.43293 11.5706 0.794906 13.5473 4.06637C15.3661 6.9949 14.3298 10.9626 11.3333 12.6588C9.41899 13.7732 6.94979 13.5019 5.33152 11.9859C4.84725 11.5371 4.45843 10.9953 4.18829 10.3928C3.55166 8.98228 3.82419 7.23085 4.86541 6.08615C5.44131 5.45416 6.22079 4.98469 7.07575 4.89346C7.4901 4.84733 7.90951 4.88679 8.30799 5.00939C8.70646 5.13199 9.07551 5.33513 9.39227 5.6062C9.51182 5.70953 9.6223 5.8223 9.72272 5.94324C9.77045 6.00073 9.68436 6.06395 9.62803 6.01485C9.51936 5.92013 9.40363 5.83331 9.28168 5.75521C7.57054 4.67238 5.55193 5.65664 4.93175 7.47218C4.76539 7.96051 4.71797 8.48149 4.79342 8.99183C4.86887 9.50217 5.06501 9.98714 5.36556 10.4064C6.53745 12.1224 8.93459 12.66 10.7168 11.595C13.1247 10.2128 13.9938 7.02361 12.6291 4.60049C10.9512 1.53756 7.27926 0.316649 4.07389 1.45652Z" fill="#A9ABBA"/>
                <path d="M4.25799 14.669C4.31507 14.7176 4.2573 14.8082 4.19344 14.7689C0.998768 12.8027 -0.0633307 8.50743 1.7815 5.15985C3.40828 2.12044 7.36253 1.03408 10.3298 2.78093C12.252 3.88161 13.2516 6.15568 12.7479 8.31513C12.6013 8.95891 12.3265 9.56654 11.9399 10.1017C11.0366 11.3583 9.38356 11.998 7.87161 11.6687C7.03634 11.4859 6.24003 11.0456 5.73353 10.3508C5.48641 10.015 5.31088 9.63207 5.21782 9.22568C5.12476 8.81929 5.11615 8.39811 5.19253 7.98826C5.22224 7.83306 5.26467 7.681 5.31919 7.53356C5.34511 7.46348 5.44291 7.50643 5.42855 7.57976C5.40085 7.72123 5.38353 7.86487 5.37687 8.00953C5.29468 10.0328 7.15638 11.2889 9.03878 10.9182C9.54486 10.8181 10.0198 10.5987 10.424 10.2782C10.8282 9.95765 11.1502 9.5453 11.363 9.07537C12.2631 7.2025 11.5301 4.85772 9.7167 3.84674C7.31576 2.45255 4.1193 3.29455 2.70316 5.68797C0.889529 8.67252 1.66815 12.463 4.25799 14.669Z" fill="#A9ABBA"/>
              </svg>
              <div class="chat-lath-text">aima</div>
            </a>
          </div>
        </div>
      `;
      this.elementSearch()
    },
    this.elementSearch = ()=>{
      this.chatInput = document.getElementById('chat-input')
      this.chatSubmit = document.getElementById('chat-submit')
      this.chatMessages = document.getElementById('chat-messages')
      this.chatBubble = document.getElementById('chat-bubble-container')
      this.chatPopup = document.getElementById('chat-popup')
      this.closePopup = document.getElementById('close-popup')
      this.chatHistory = document.getElementById('chat-history')
    },
    this.autoSizeWidth = ()=>{
      if(window.innerWidth < 768){ return }
      if(this.chatMessages.clientHeight < this.chatMessages.scrollHeight){
        this.chatMessages.style.paddingRight = '13px';
      }
    },
    this.messagesContainerCheckWidth = ()=>{
      if(window.innerWidth > 768 && this.chatMessages.clientHeight < this.chatMessages.scrollHeight){ 
        this.chatMessages.style.paddingRight = '13px';
      } else {
        this.chatMessages.style.paddingRight = '16px';
      }
    },
    this.resizeChatWidth = ()=>{
      window.addEventListener('resize', () => {
        this.messagesContainerCheckWidth()
      })
    },
    this.textareaCheckWidth = ()=>{
      if(window.innerWidth < 768){ return }
      const textareaMaxHeight = parseFloat(getComputedStyle(this.chatInput).maxHeight);
      if(textareaMaxHeight < this.chatInput.scrollHeight){
        this.chatInput.style.paddingRight = '13px';
      } else {
        this.chatInput.style.paddingRight = '16px';
      }
    },
    this.textareaAutoSizeWidth = ()=>{
      this.chatInput.addEventListener('input', () => {
        this.textareaCheckWidth();
      })
    },
    this.textareaCheckHeight = ()=>{
      this.chatInput.style.height = "36px"
      this.chatInput.style.height = this.chatInput.scrollHeight + 'px'; 
    },
    this.textareaAutoHeight = ()=>{
      this.chatInput.addEventListener('input', ()=>{
        this.textareaCheckHeight()
      })
    },
    this.sendingToChat = ()=>{
      this.chatSubmit.addEventListener('click', async () => {
        const message = this.chatInput.value.trim();
        if (!message) return;
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  
        this.onUserRequest(message);
        
        globalThis.prints.printsAdd()
        
        this.autoSizeWidth()
        this.textareaCheckHeight()
      });
    },
    this.sendingUsingEnter = ()=>{
      this.chatInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          this.chatSubmit.click();
          this.autoSizeWidth()
        }
      });
    },
    this.textareaCancelNewlineOn = ()=>{
      this.chatInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter'){
          e.preventDefault()
        }
      })
    },
    this.openChat = ()=>{
      this.chatBubble.addEventListener('click', () => {
        this.togglePopup();
      });
    },
    this.closeChat = ()=>{
      this.closePopup.addEventListener('click', () => {
        this.togglePopup();
      });
    },
    this.togglePopup = ()=>{
      this.chatPopup.classList.toggle('hidden');
    },
    this.scrollWindowToBottom = ()=>{
      this.chatPopup.classList.remove('hidden')
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight
      this.chatPopup.classList.add('hidden')
    },
  
    this.chatAutoStart = {
      init(){
        if (this.defineUserAgentIsMobile()) return
        if (this.defineIfChatWasOpened()) return
        this.setTimeoutAutoStart()
      },
  
      mobileUserAgents: ['android', 'iphone', 'ipad', 'ipod', 'windows phone', 'blackberry', 'webos', 'symbian', 'bada', 'tizen', 'kaios', 'mobile', 'silk', 'opera mini', 'opera mobi', 'chrome mobile', 'crios', 'fxios', 'ucbrowser', 'samsungbrowser', 'qqbrowser'],
  
      defineUserAgentIsMobile() {
        const userAgent = window.navigator.userAgent
        const isMobile = false
        for (let i = 0; i < this.mobileUserAgents.length ; i++){
          if (userAgent.includes(this.mobileUserAgents[i])) isMobile = true
        }
        return isMobile
      }, 
  
      defineIfChatWasOpened() {
        return localStorage.getItem('chat-was-opened-on-auto-start')
      },
  
      setTimeoutAutoStart(){
        if(globalThis.config?.seconds_to_autostart){
          setTimeout(()=>{
            if(globalThis.checkFirstOpening.isOpened) return
            if(globalThis.chatPopup.classList.contains('hidden')){
              globalThis.chatBubble.click()
              this.setLocaleStorageInfoAboutOpening()
            }
          }, globalThis.config?.seconds_to_autostart * 1000)
        }
      },
  
      setLocaleStorageInfoAboutOpening() {
        localStorage.setItem('chat-was-opened-on-auto-start', true)
      }
    }
  
    this.userMessageAppend = (message)=>{
        const messageElement = this.getUserMessage(message)
        this.chatMessages.appendChild(messageElement);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        this.chatInput.value = '';
    },
  
    this.onUserRequest = (message)=>{
      try{
        this.userMessageAppend(message);
        
        this.ws.send(JSON.stringify({
          "action": "MESSAGE", 
          "session_id": localStorage.getItem('session_id'),
          message
        }))
  
      } catch(e){
        console.log(e)
      }
    },
    this.getBotMessage = (message)=>{
      let parseMessage = globalThis.convertingFunction.parseLinks(message) 
      parseMessage = globalThis.convertingFunction.parseBoldText(parseMessage) 
      const bMessage = document.createElement('div')
      bMessage.className = 'flex mb-3 chat-message-bot-container';
      bMessage.innerHTML = `<div class="chat-message-bot">${parseMessage}</div>`;
      return bMessage
    },
    this.getUserMessage = (message)=>{
      const uMessage = document.createElement('div');
      uMessage.className = 'chat-message-user-container';
      uMessage.innerHTML = `<div class="chat-message-user">${message}</div>`;
      return uMessage
    },
    this.loadMessageHistory = ()=>{
      this.config.conversation_history.forEach(({author, message}) => {
        this.chatHistory.append(author === 'USER' ? this.getUserMessage(message) : this.getBotMessage(message))
      })
      this.scrollWindowToBottom()
    },
    this.reply = (message)=>{
      this.messageSound.audioPlay()
      const replyElement = this.getBotMessage(message)
      this.chatMessages.appendChild(replyElement);
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
      this.autoSizeWidth()
    },
  
    this.openWebSoket = async (domain='api.dev.goaima.ai') => {
      await this.locationData.init()
      const {appId, apiHash} = document.querySelector('#aima-chat-widget').dataset
      this.ws = new WebSocket(`wss://${domain}/api/v1/webhook/chat_widget?app_id=${appId}&api_hash=${apiHash}`)
      this.webSocketOpenHandler()
      this.webSocketMessageHandler()    
      this.webSocketCloseHandler()
      this.websocketClosure()
    },
    this.webSocketOpenHandler = async ()=>{
      const helpers = globalThis.helpers
      const utm = helpers.getUTMData()
      const params = helpers.getParams()
      const locationData = this.locationData.data;
      this.ws.onopen = (e)=>{
        this.ws.send(JSON.stringify({
          "action": "INIT",
          "session_id": localStorage.getItem('session_id') ? localStorage.getItem('session_id') : undefined,
          "metadata": {
            "utm_data": {
                  "campaign": utm?.['utm_campaign'] ? utm?.['utm_campaign'] : '',
                  "source": utm?.['utm_source'] ? utm?.['utm_source'] : '',
                  "medium": utm?.['utm_medium'] ? utm?.['utm_medium'] : '',
                  "search_term": utm?.['utm_term'] ? utm?.['utm_term'] : '',
                  "original_source": utm?.['utm_original_source'] ? utm?.['utm_original_source'] : '',
                  "content": utm?.['utm_content'] ? utm?.['utm_content'] : '',
              },
            "gclid": params?.['gclid'] ? params?.['gclid'] : '',
            "referring_url": helpers.getReferrerURL(),
            "timestamp": helpers.getTimeStamp(),
            "location_data": locationData,
          }
        }))
      }
    },
    this.webSocketMessageHandler = ()=>{
      this.ws.onmessage = (e)=>{
        const response = JSON.parse(JSON.parse(e.data))
        if(response.action === 'INIT'){
  
          if(localStorage.getItem('session_id')){
          } else {
            localStorage.setItem('session_id', response.session_id)
          }
          this.writingDataToConfig(response)
          
          // if(!this.checkDomen()) return false
          this.init()
          this.messageSound.init()
          this.iconForUnreadMessage.init()
        }
  
        if(response.action === 'MESSAGE'){
          this.reply(response.answer)
          this.iconForUnreadMessage.messageCheck()
          globalThis.prints.printsRemove()
        }
      }
    },
    this.webSocketCloseHandler = ()=>{
      this.ws.onclose = (e)=>{
        this?.chatInput?.setAttribute('disabled', true)
      }
    },
    this.websocketClosure = () => {
      document.addEventListener('unload', ()=>{
        this.ws.close()
      })
    }
    this.writingDataToConfig = (rspns)=>{
      this.config = {
        ...this.config,
        salesperson_name: rspns.salesperson_name,
        salesperson_role: rspns.salesperson_role,
        chat_title: rspns.chat_title,
        circle_color: rspns.circle_color,
        header_color: rspns.header_color,
        seconds_to_autostart: rspns.seconds_to_autostart,
        send_button_color: rspns.send_button_color,
        user_message_color: rspns.user_message_color,
        widget_location: rspns.widget_location,
        conversation_history: rspns.conversation_history,
        allowed_domains: rspns.allowed_domains
      }
    },
    this.checkDomen = ()=>{
      const currentHref = window.location.href
      if(currentHref.includes(this.config.allowed_domains[0])){
        return true
      } else {
        console.log('Ваш домен не включен в список доступных доменов')
        return false
      }
    }
  
    this.prints = {
      callArray: [],
      printsLoadingChoiceActionStart(){
        this.callArray.push(true)
        if(this.callArray.length === 1){
            this.printsAdd()
        }
      },
      printsLoadingChoiceActionFinish(){
        if(this.callArray.length === 1){
            this.printsRemove()
        }
        this.callArray.pop()
    },
      printsAdd(){
        const printsContainer = document.querySelector('.chat-status')
        if(printsContainer.querySelector('[data-chat-prints-loading]')) return
        printsContainer.prepend(this.getPrintsHTML())
      },
      printsRemove(){
        const printsContainer = document.querySelector('.chat-status [data-chat-prints-loading]')
        printsContainer?.remove()
      },
      getPrintsHTML(){
        const prints = document.createElement('div')
        prints.innerHTML = `<div class="chat-prints" data-chat-prints-loading>
                                        <div class="chat-prints-circle-container">
                                          <div class="chat-prints-circle chat-prints-circle-first"></div>
                                            <div class="chat-prints-circle chat-prints-circle-second"></div>
                                              <div class="chat-prints-circle chat-prints-circle-third"></div>
                                            </div>
                                            writing
                                        </div>`
        return prints.firstElementChild
      }
    }
  
    this.messageSound = {
      init(){
        this.createAudio()
      },
      createAudio(){
        this.sound = document.createElement('audio')
        this.sound.src = `https://cabinet-backend.goaima.ai/static/audio/message_sound.mp3`
        this.sound.addEventListener('error', ()=>{
          this.sound = null
        })
      },
      audioPlay(){
        if(!this.sound) return
        if(!this.sound.paused){
          this.sound.pause()
          this.sound.currentTime = 0;
        }
        this.sound.play()
      }
    }
  
    this.iconForUnreadMessage = {
      init(){
        this.chatOpenHandler()
      },
      messageCheck(){
        if(!this.closeCheck()) return
        this.showIcon()
        this.setNotifLocaleStorage()
      },
      closeCheck(){
        const chat = document.querySelector('#chat-popup')
        if(!chat) return
        return chat.classList.contains('hidden') 
      },
      showIcon(){
        const icon = document.querySelector('#chat-unread-message-icon')
        if(!icon) return
        icon.classList.remove('hidden')
      },
      setNotifLocaleStorage(){
        localStorage.setItem('unred-message', true)
      },
      removeNotifLocaleStorage(){
        localStorage.removeItem('unred-message')
      },
      checkNotifLocaleStorage(){
        if(localStorage.getItem('unred-message')){
          this.showIcon()
        }
      },
      hiddenIcon(){
        const icon = document.querySelector('#chat-unread-message-icon')
        if(!icon) return
        icon.classList.add('hidden')
      },
      chatOpenHandler(){
        const btnOpen = document.querySelector('#chat-bubble-container')
        if(!btnOpen) return
        btnOpen.addEventListener('click', ()=>{
          if(!this.closeCheck()){
            this.hiddenIcon()
            this.removeNotifLocaleStorage()
          } 
        })
      }
    }
  
    this.insertMetaTag = () => {
      let meta = document.querySelector('meta[name="viewport"]');
      if(!meta){
        meta = document.createElement('meta');
        meta.name = 'viewport';
        document.getElementsByTagName('head')[0].appendChild(meta);
      }
      if(meta.content){
        if(!meta.content.includes(', user-scalable=no')){
          meta.content += ', user-scalable=no';
        } else {
          meta.content = "width=device-width, initial-scale=1.0, user-scalable=no";
        }
      }
    }
  
    this.convertingFunction = {
      parseLinks(message){
        var urlRegex = urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return message.replace(urlRegex, function(url) {
          return '<a href="' + url + '" target="_blank">' + url + '</a>';
        })
      },
  
      parseBoldText(message) {
        const boldRegex = /\*([^*]+)\*/g;
        message = message.replace(boldRegex, function(match, text) {
          return '<p class="semi-bold">' + text + '</p>';
        });
  
        return message;
      }
    }
  
    this.locationData = {
      async init(){
        this.data = await this.getLocationData()
      },
  
      data: '',
  
      async getLocationData(){
        try{
          const response = await fetch('https://ipwho.is/')
          const data = await response.json()
          return data?.city || ''
        } catch (e){
          console.error(e)
          return ''
        }
      },
    }
  
    this.helpers = {
      getTimeStamp(){
        return Date.now()
      },
      getUTMData(){
        const url = window.location.href
        const searchParams = Object.fromEntries((new URL(url)).searchParams.entries())
        Object.keys(searchParams).forEach(paramKey => {
            if(!paramKey.startsWith('utm_')) delete searchParams[paramKey]
        })
        return searchParams
      },
      getParams(){
        const url = window.location.href
        const searchParams = Object.fromEntries((new URL(url)).searchParams.entries())
        return searchParams
      },
      getReferrerURL(){
        return document.referrer
      }
    }
  }
  
  (function(){
    const chat = new chatWidget()
    chat.openWebSoket('api-dev.goaima.ai')
  })();
  