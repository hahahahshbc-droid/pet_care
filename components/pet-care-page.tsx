"use client";

import Image from "next/image";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

export type PetType = "dog" | "cat";

export type Service = {
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
  features: string[];
};

const services: Record<PetType, Service[]> = {
  dog: [
    {
      name: "清爽基础浴",
      description: "干干净净，是快乐的第一步。",
      price: 79,
      duration: "约 60–90 分钟",
      icon: "♧",
      features: ["温和清洁 · 护毛调理", "耳部清洁 · 修剪指甲", "脚底毛整理 · 吹干梳顺"],
    },
    {
      name: "精致造型护",
      description: "让每一个小可爱，都有自己的风格。",
      price: 159,
      duration: "约 90–150 分钟",
      icon: "✂",
      features: ["包含清爽基础浴全部项目", "全身毛发修剪 · 专属造型", "面部精修 · 细节整理"],
    },
    {
      name: "柔润深层护",
      description: "给毛发加一点柔软，给拥抱加分。",
      price: 199,
      duration: "约 90–120 分钟",
      icon: "✧",
      features: ["包含清爽基础浴全部项目", "深层护毛 · 柔顺护理", "浮毛梳理 · 毛发养护建议"],
    },
  ],
  cat: [
    {
      name: "喵喵清爽浴",
      description: "给爱干净的小猫，细致的清洁。",
      price: 129,
      duration: "约 60–90 分钟",
      icon: "♧",
      features: ["猫咪专用洗护 · 温水清洁", "耳部清洁 · 修剪指甲", "轻柔吹干 · 毛发梳顺"],
    },
    {
      name: "蓬松去浮毛",
      description: "梳掉多余浮毛，轻盈自在。",
      price: 189,
      duration: "约 90–120 分钟",
      icon: "✂",
      features: ["包含喵喵清爽浴全部项目", "分层梳理 · 浮毛护理", "局部毛发整理 · 护理建议"],
    },
    {
      name: "长毛柔润护",
      description: "照顾每一缕长毛，柔软好摸。",
      price: 229,
      duration: "约 90–150 分钟",
      icon: "✧",
      features: ["包含喵喵清爽浴全部项目", "长毛柔顺护理 · 深层护毛", "细致梳理 · 日常养护建议"],
    },
  ],
};

function localDateString() {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000)
    .toISOString()
    .slice(0, 10);
}

export function PetCarePage() {
  const [pet, setPet] = useState<PetType>("dog");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(0);
  const [result, setResult] = useState("");
  const [minDate, setMinDate] = useState("");
  const [year, setYear] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setMinDate(localDateString());
    setYear(new Date().getFullYear());
  }, []);

  const choosePet = (nextPet: PetType) => {
    setPet(nextPet);
    setSelectedService(0);
    setResult("");
  };

  const openBooking = (index = 0) => {
    setSelectedService(index);
    setResult("");
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const closeFromBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog || event.target !== event.currentTarget) return;

    const rect = dialog.getBoundingClientRect();
    const outside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (outside) dialog.close();
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const service = services[pet][selectedService];
    setResult(
      `已生成意向：联系人 ${formData.get("contactName")}，手机号 ${formData.get("phone")}，宠物 ${formData.get("petName")}，${formData.get("date")}，${service.name}。此为演示，尚未预约成功，也未发送任何信息。`,
    );
  };

  return (
    <>
      <div className="announcement">给每一只毛孩子，多一点温柔，多一点陪伴。</div>
      <header>
        <div className="wrap nav">
          <a href="#" className="brand" aria-label="毛里时光首页">
            <span className="brand-icon">P.</span>
            <span className="brand-name">
              毛里时光<small>PAWDAY PET SPA</small>
            </span>
          </a>
          <nav
            className={`nav-links${menuOpen ? " open" : ""}`}
            id="navLinks"
            aria-label="主要导航"
          >
            <a href="#services" onClick={closeMenu}>洗护服务</a>
            <a href="#care" onClick={closeMenu}>安心护理</a>
            <a href="#visit" onClick={closeMenu}>关于门店</a>
          </nav>
          <button className="button" type="button" onClick={() => openBooking()}>
            预约洗护 <span aria-hidden="true">↗</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "收起导航" : "展开导航"}
            aria-expanded={menuOpen}
            aria-controls="navLinks"
            onClick={() => setMenuOpen((open) => !open)}
          >
            ☰
          </button>
        </div>
      </header>

      <main>
        <div className="wrap hero">
          <div>
            <div className="eyebrow">A GOOD DAY, A CLEAN PAW.</div>
            <h1>
              洗掉小烦恼，<br />留下<em>毛茸茸的快乐。</em>
            </h1>
            <p className="intro">
              从一场暖暖的泡泡浴，到一身轻盈蓬松。<br />把毛孩子交给我们，把亲昵的时光留给你。
            </p>
            <div className="hero-actions">
              <button className="button" type="button" onClick={() => openBooking()}>
                预约一场宠爱 <span aria-hidden="true">↗</span>
              </button>
              <a className="button secondary" href="#services">看看洗护服务</a>
            </div>
            <div className="hero-note">
              <span className="tiny-paws" aria-hidden="true">🐶 🐱</span>
              <div>
                <strong>大朋友、小朋友，都好好照顾</strong>
                犬猫分区护理 · 一宠一清洁 · 温柔陪伴
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/pet-photo.jpg"
              alt="一只毛发蓬松的可爱狗狗"
              width={550}
              height={510}
              priority
            />
            <div className="round-seal">CLEAN &amp; HAPPY<b>♥</b>WITH LOVE</div>
            <div className="image-label">
              <span aria-hidden="true">✦</span>
              <div><strong>今日份，蓬松到位。</strong>Clean paws. Happy hearts.</div>
            </div>
          </div>
        </div>

        <div className="wrap qualities">
          <div className="quality">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2 4 6v6c0 5 8 10 8 10s8-5 8-10V6Z" /><path d="m8 12 3 3 5-6" /></svg>
            <div>一宠一清洁<small>每一次护理，都认真对待</small></div>
          </div>
          <div className="quality">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3s-7 8-7 12a7 7 0 0 0 14 0c0-4-7-12-7-12Z" /><path d="M9 16c0 2 2 3 3 3" /></svg>
            <div>温和洗护<small>根据毛发状态选择洗护</small></div>
          </div>
          <div className="quality">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20S2 14 2 8a5 5 0 0 1 10-1 5 5 0 0 1 10 1c0 6-10 12-10 12Z" /></svg>
            <div>耐心陪伴<small>照顾每一点小情绪</small></div>
          </div>
          <div className="quality">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg>
            <div>预约到店<small>少一点等待，多一点自在</small></div>
          </div>
        </div>

        <section className="wrap services-section" id="services">
          <div className="section-head">
            <div>
              <div className="kicker">OUR SERVICES</div>
              <h2>每一种可爱，都值得被宠爱。</h2>
            </div>
            <div className="tabs" role="group" aria-label="选择宠物类型">
              <button className="tab" type="button" aria-pressed={pet === "dog"} onClick={() => choosePet("dog")}>狗狗洗护</button>
              <button className="tab" type="button" aria-pressed={pet === "cat"} onClick={() => choosePet("cat")}>猫咪洗护</button>
            </div>
          </div>
          <div className="cards">
            {services[pet].map((service, index) => (
              <article className={`card${index === 1 ? " featured" : ""}`} key={service.name}>
                {index === 1 && <span className="popular">细致护理之选</span>}
                <div className="card-heading">
                  <div className="service-icon" aria-hidden="true">{service.icon}</div>
                  <div>
                    <h3>{service.name}</h3>
                    <p className="desc">{service.description}</p>
                  </div>
                </div>
                <div className="card-pricing">
                  <div className="price"><span className="currency">¥</span>{service.price}<small>起 / 次</small></div>
                  <div className="duration">{service.duration}</div>
                </div>
                <ul>
                  {service.features.map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <button
                  className={`button${index === 1 ? "" : " secondary"}`}
                  type="button"
                  onClick={() => openBooking(index)}
                >
                  预约这份宠爱 <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
          <p className="pricing-note">* 以上为示例起步价。实际费用依据体重、毛量及打结情况，在护理前确认；特殊皮肤情况请先咨询兽医。</p>
        </section>

        <section className="wrap care-section" id="care">
          <div className="care-panel">
            <div className="care-copy">
              <div>
                <div className="kicker">CARE IN EVERY LITTLE DETAIL</div>
                <h2>慢一点，轻一点。<br />让洗澡也成为好时光。</h2>
              </div>
              <p className="care-note">
                先熟悉，再亲近。我们重视毛孩子的感受，从见面的第一刻，到回家的最后一梳。
              </p>
            </div>
            <ol className="steps">
              {[
                ["01", "见面，先交个朋友", "了解性格、毛发状态与护理习惯。"],
                ["02", "温水，洗去小烦恼", "适宜水温，仔细清洁每一处毛发。"],
                ["03", "轻柔，吹出蓬松感", "关注情绪变化，适时休息与安抚。"],
                ["04", "检查，漂亮地回家", "整理毛发，分享日常护理建议。"],
              ].map(([number, title, text]) => (
                <li className="step" key={number}>
                  <span className="step-number">{number}</span>
                  <div><h3>{title}</h3><p>{text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="wrap visit-section" id="visit">
          <div className="visit-heading">
            <div>
              <div className="kicker">VISIT PAWDAY</div>
              <h2>来店里，见一面。</h2>
            </div>
            <p>预约到店，让毛孩子少一点等待，多一点安心。</p>
          </div>

          <div className="store-info" aria-label="门店信息">
            <div className="store-name">
              <span className="store-mark" aria-hidden="true">P.</span>
              <div>
                <span className="info-label">门店</span>
                <strong>毛里时光 · 宠物洗护生活馆</strong>
                <p>犬猫分区护理 · 一宠一清洁</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">⌖</span>
              <div>
                <span className="info-label">门店地址</span>
                <strong>上海市静安区愚园路 168 号</strong>
                <p>到店前请先完成预约确认</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon" aria-hidden="true">◷</span>
              <div>
                <span className="info-label">营业时间</span>
                <strong>每日 10:00–20:00</strong>
                <p>预约成功后将确认具体到店时段</p>
              </div>
            </div>
            <button className="button store-booking" type="button" onClick={() => openBooking()}>
              预约到店 <span aria-hidden="true">↗</span>
            </button>
          </div>

          <div className="map-panel">
            <div className="map-bar">
              <div>
                <span className="info-label">门店地图</span>
                <strong>上海市静安区愚园路 168 号</strong>
              </div>
              <span className="map-status">每日 10:00–20:00</span>
            </div>
            <iframe
              className="store-map"
              title="毛里时光门店位置地图"
              src="https://www.openstreetmap.org/export/embed.html?bbox=121.429%2C31.214%2C121.477%2C31.236&amp;layer=mapnik&amp;marker=31.225%2C121.453"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <div className="footer-brand">毛里时光 <span>PAWDAY</span></div>
          <span>用心洗护，把可爱还给日常。</span>
          <span>© {year ?? ""} PAWDAY · 示例门店页面</span>
        </div>
      </footer>

      <dialog ref={dialogRef} aria-labelledby="bookingTitle" onClick={closeFromBackdrop}>
        <button className="close" type="button" aria-label="关闭预约窗口" onClick={() => dialogRef.current?.close()}>×</button>
        <h2 className="dialog-title" id="bookingTitle">预约一段毛里时光</h2>
        <p className="form-note">这是预约演示，信息不会发送至门店。正式预约功能需接入门店联系方式。</p>
        <form onSubmit={submitBooking}>
          <label className="field">
            洗护项目
            <select value={selectedService} onChange={(event) => setSelectedService(Number(event.target.value))} required>
              {services[pet].map((service, index) => (
                <option value={index} key={service.name}>
                  {pet === "dog" ? "狗狗" : "猫咪"} · {service.name} · ¥{service.price} 起
                </option>
              ))}
            </select>
          </label>
          <div className="form-row">
            <label className="field">
              联系人
              <input
                name="contactName"
                autoComplete="name"
                placeholder="怎么称呼您？"
                maxLength={30}
                required
              />
            </label>
            <label className="field">
              手机号
              <input
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="请输入 11 位手机号"
                pattern="1[3-9][0-9]{9}"
                title="请输入正确的 11 位手机号"
                maxLength={11}
                required
              />
            </label>
          </div>
          <div className="form-row">
            <label className="field">
              宠物昵称
              <input name="petName" autoComplete="off" placeholder="怎么称呼毛孩子？" maxLength={30} required />
            </label>
            <label className="field">
              期望日期
              <input name="date" type="date" min={minDate} required />
            </label>
          </div>
          <button type="submit" className="button full-width">生成预约意向</button>
          <p className="form-result" role="status" aria-live="polite">{result}</p>
        </form>
      </dialog>
    </>
  );
}
