// 判断是否处于销售状态
export const checkSaleStatus = (product) => {

    if (!product) {
        return { isSaleStarted: false, isSoldout: false };
      }

    const now = Date.now();
    const saleStartTime = new Date(product.saleStartTime).getTime();
    const saleEndTime = new Date(product.saleEndTime).getTime();
  
    const isSaleStarted = (now >= saleStartTime && now <= saleEndTime);
    const isSoldout = (product.stock === 0);
  
    return { isSaleStarted, isSoldout };
  };

// 计算并更新倒计时时间
export const calculateCountdown = (product) => {

    if (!product || !product.saleStartTime || !product.saleEndTime) {
        return null;
      }
      
    const now = Date.now();
    const { isSaleStarted, isSoldout } = checkSaleStatus(product);
  
    let timeDifference;
    if (isSaleStarted && !isSoldout) {
      timeDifference = new Date(product.saleEndTime).getTime() - now;
    } else {
      timeDifference = new Date(product.saleStartTime).getTime() - now;
    }
  
    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
  
      return { days, hours, minutes, seconds };
    }
  };