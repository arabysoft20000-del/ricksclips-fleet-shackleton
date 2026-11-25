// Shackleton — The Fourth Man. Arabic VO followed exactly; every time comes from clock.at()
// with the exact Arabic word texts in words.json (wordClock patched Unicode-aware in the project copy).
import words from "./words.js";

export default {
  seed: 1916,
  words,
  light: "day",
  build({ W, kit, mat, cast, fx, makeLook, rand, clock, aim, aerial, THREE }) {
    const { at } = clock;
    const SNOW = "#eef3f8", ICE = "#eaf2fa", ROCKC = "#8fa0b0", WOOD = "#6b4a30";

    // ---------- world ----------
    kit.ground(W, { kind: "dirt", color: SNOW, size: 400 });
    kit.hills(W, { color: "#d7e5f2", dist: 130, count: 8 });

    const peak = (x, z, r, h) => {
      const g = new THREE.Group();
      g.add(kit.cyl(0.3, r, h, mat("flat", { color: "#ccdcee", seed: 7 }), { y: h / 2, seg: 7 }));
      g.add(kit.cyl(0.25, r * 0.38, h * 0.34, mat("flat", { color: "#f6fafd", seed: 8 }), { y: h * 0.83, seg: 7 }));
      g.position.set(x, 0, z);
      return W.add(g, { name: "peak" });
    };
    peak(-25, -55, 12, 20); peak(15, -65, 14, 24); peak(-5, -80, 16, 26); peak(35, -50, 10, 16); peak(-40, -35, 10, 15); peak(55, -70, 13, 20); peak(-60, -60, 12, 18); peak(70, -40, 11, 17);

    const iceBlock = (x, z, s, ry = 0) => W.add(kit.box(s, s * 0.55, s * 0.8, mat("flat", { color: ICE, seed: 9 }), { x, y: s * 0.27, z, ry }), { name: "ice" });
    // ridge zone dressing
    kit.rock(W, { x: -4.5, z: -3, s: 1.4, color: ROCKC }); kit.rock(W, { x: 5.5, z: -4.5, s: 1.1, color: ROCKC });
    kit.rock(W, { x: -6, z: 4, s: 0.9, color: ROCKC }); kit.rock(W, { x: 7, z: 3.5, s: 1.6, color: ROCKC });
    iceBlock(-3.2, -1.5, 1.1, 0.4); iceBlock(4.2, 1.8, 0.9, -0.3); iceBlock(-5.5, 1.2, 0.7, 0.2);
    kit.rock(W, { x: 2.5, z: -2.5, s: 1.2, color: ROCKC }); kit.rock(W, { x: -3.5, z: 0.5, s: 1.0, color: ROCKC }); kit.rock(W, { x: 6, z: 5, s: 1.3, color: ROCKC });
    iceBlock(-1.5, -4, 1.2, 0.3); iceBlock(3, -3.5, 0.9, -0.2);
    kit.crate(W, { x: -4.5, z: 3.5, s: 0.7, ry: 0.3 }); kit.barrel(W, { x: 6.5, z: 1.5, s: 0.9 });
    // "1916" sign on a post (digits only — nothing to mirror)
    const signPost = (text, x, z, ry = 0) => {
      const g = new THREE.Group();
      g.add(kit.cyl(0.05, 0.06, 1.5, mat("wood", { color: WOOD, seed: 3 }), { y: 0.75 }));
      const b = kit.signBoard(text, { x: 0, y: 1.45, z: 0, w: 1.5, h: 0.5 });
      g.add(b); g.position.set(x, 0, z); g.rotation.y = ry;
      return W.add(g, { name: "sign" });
    };
    const sign1916 = signPost("1916", -1.7, 1.5, 0.4);

    // footprints: a fourth trail beside the men's line (ridge zone, always there; cameras find it)
    const prints = new THREE.Group();
    for (let i = 0; i < 11; i++) {
      const u = i / 10, x = 0.0 + u * 2.3 + (i % 2 ? 0.16 : -0.16), z = 2.3 - u * 3.9;
      prints.add(kit.box(0.13, 0.02, 0.32, mat("flat", { color: "#aec3d8", seed: 4 }), { x, y: 0.012, z, ry: 0.5 }));
    }
    W.add(prints, { name: "footprints", collide: false });

    // ---------- sea zone (x ~ 45) ----------
    kit.water(W, { x: 48, z: 0, w: 80, d: 65, color: "#2e6ea8", y: 0.03 });
    const boat = new THREE.Group();
    const hullM = mat("planks", { color: "#7a5233", seed: 12 });
    boat.add(kit.box(5.4, 0.45, 1.8, hullM, { y: 0.02 }));
    boat.add(kit.box(5.4, 0.5, 0.12, hullM, { y: 0.35, z: 0.9 })); boat.add(kit.box(5.4, 0.5, 0.12, hullM, { y: 0.35, z: -0.9 }));
    boat.add(kit.box(0.9, 0.5, 1.5, hullM, { x: 2.9, y: 0.3, ry: 0.5 })); boat.add(kit.box(0.9, 0.5, 1.5, hullM, { x: -2.9, y: 0.3, ry: -0.5 }));
    boat.add(kit.box(1.6, 0.08, 0.5, mat("wood", { color: WOOD, seed: 13 }), { x: -1.4, y: 0.42 }));
    boat.add(kit.box(1.6, 0.08, 0.5, mat("wood", { color: WOOD, seed: 13 }), { x: 1.2, y: 0.42 }));
    boat.add(kit.cyl(0.05, 0.07, 3.6, mat("wood", { color: WOOD, seed: 14 }), { x: 2.2, y: 1.9 }));
    boat.add(kit.box(0.05, 0.5, 0.8, mat("flat", { color: "#b8473a", seed: 15 }), { x: 2.35, y: 3.3 }));
    boat.position.set(45, 0, 0);
    W.add(boat, { name: "lifeboat", collide: false });
    kit.crate(W, { x: 43.2, z: 0.4, s: 0.55, ry: 0.2 }); kit.barrel(W, { x: 46.9, z: -0.3, s: 0.7 });
    iceBlock(39, 4.5, 1.6, 0.3); iceBlock(51, -4, 2.0, -0.2); iceBlock(47, 6, 1.2, 0.6); iceBlock(41, -6, 1.4, 0.1); iceBlock(53, 3, 1.1, 0.4);
    iceBlock(42.8, 1.8, 1.0, 0.2); iceBlock(47.5, 2.4, 0.9, -0.4); iceBlock(43, -2.8, 0.8, 0.5);
    kit.rock(W, { x: 36, z: -8, s: 2.2, color: ROCKC }); kit.rock(W, { x: 55, z: 8, s: 1.8, color: ROCKC });

    // ---------- Elephant Island camp (x ~ -45) ----------
    const tent = (x, z, ry, c) => {
      const g = new THREE.Group(); const m = mat("flat", { color: c, seed: 20 });
      g.add(kit.box(2.4, 0.08, 1.7, m, { x: -0.55, y: 0.75, rz: 0.72 })); g.add(kit.box(2.4, 0.08, 1.7, m, { x: 0.55, y: 0.75, rz: -0.72 }));
      g.add(kit.box(0.08, 1.1, 1.6, m, { x: 0, y: 0.55, z: -0.8 })); g.add(kit.cyl(0.04, 0.04, 1.5, mat("wood", { color: WOOD, seed: 21 }), { x: 0, y: 0.75, z: 0.85 }));
      g.position.set(x, 0, z); g.rotation.y = ry; return W.add(g, { name: "tent" });
    };
    tent(-48, -4, 0.4, "#b8a888"); tent(-42, -6, -0.3, "#a89878"); tent(-46.5, 3.5, 0.9, "#c2b294"); tent(-40, 1, 0.2, "#b8a888");
    kit.crate(W, { x: -43.5, z: -1.5, s: 0.8, ry: 0.4 }); kit.crate(W, { x: -43.4, z: -0.6, s: 0.6, ry: -0.2 });
    kit.barrel(W, { x: -47.5, z: 0.5, s: 1 }); kit.barrel(W, { x: -41.5, z: -3.5, s: 0.9 });
    kit.lamp(W, { x: -44, z: 2.5, on: false }); signPost("22", -46.5, -3.5, 0.4);
    kit.rock(W, { x: -50, z: 2, s: 1.5, color: ROCKC }); kit.rock(W, { x: -39, z: -5, s: 1.2, color: ROCKC });
    iceBlock(-49, -1, 1.0, 0.2); iceBlock(-40.5, 4.5, 0.8, -0.4);
    // sled
    const sled = new THREE.Group();
    sled.add(kit.box(2.2, 0.1, 0.9, mat("planks", { color: "#8a6238", seed: 22 }), { y: 0.35 }));
    sled.add(kit.box(2.4, 0.08, 0.1, mat("wood", { color: WOOD, seed: 23 }), { y: 0.08, z: 0.4 })); sled.add(kit.box(2.4, 0.08, 0.1, mat("wood", { color: WOOD, seed: 23 }), { y: 0.08, z: -0.4 }));
    sled.add(kit.box(0.7, 0.5, 0.6, mat("flat", { color: "#7a3b2e", seed: 24 }), { x: -0.4, y: 0.65 }));
    sled.position.set(-45.5, 0, 5.5); sled.rotation.y = 0.5; W.add(sled, { name: "sled" });

    // ---------- glacier zone (z ~ -33) ----------
    iceBlock(-5, -36, 1.8, 0.3); iceBlock(5, -37, 1.5, -0.2); iceBlock(-2, -39, 2.2, 0.5); iceBlock(9.5, -36, 1.0, 0.1);
    kit.rock(W, { x: 7.6, z: -39.2, s: 1.7, color: ROCKC }); kit.rock(W, { x: 7.2, z: -37.4, s: 1.1, color: ROCKC }); kit.rock(W, { x: -7, z: -34, s: 1.3, color: ROCKC });
    kit.rock(W, { x: 3.5, z: -40, s: 2.0, color: ROCKC }); kit.rock(W, { x: -4, z: -41, s: 1.6, color: ROCKC });
    kit.rock(W, { x: -3, z: -35, s: 1.4, color: ROCKC }); kit.rock(W, { x: 4.5, z: -35.5, s: 1.2, color: ROCKC }); kit.rock(W, { x: -5.5, z: -31, s: 1.1, color: ROCKC });
    iceBlock(2.5, -36.5, 1.3, 0.2); iceBlock(-2.5, -30.5, 0.9, -0.3);
    // hero props in the snow (rope coil, adze, boot with screws) — foreground of shot 5
    const propsG = new THREE.Group();
    propsG.add(kit.cyl(0.34, 0.34, 0.14, mat("flat", { color: "#c9a86a", seed: 30 }), { x: 0, y: 0.07, z: 0, seg: 18 }));
    propsG.add(kit.cyl(0.2, 0.2, 0.16, mat("flat", { color: "#b8945a", seed: 31 }), { x: 0, y: 0.08, z: 0, seg: 18 }));
    propsG.add(kit.box(0.07, 0.7, 0.07, mat("wood", { color: WOOD, seed: 32 }), { x: 0.55, y: 0.3, z: 0.1, rz: 0.5 }));
    propsG.add(kit.box(0.3, 0.09, 0.12, mat("flat", { color: "#5a6068", seed: 33 }), { x: 0.72, y: 0.55, z: 0.1, rz: 0.5 }));
    propsG.add(kit.box(0.34, 0.16, 0.15, mat("flat", { color: "#4a3423", seed: 34 }), { x: -0.55, y: 0.3, z: 0.05, rz: 2.6 }));
    for (let i = 0; i < 4; i++) propsG.add(kit.cyl(0.015, 0.015, 0.05, mat("flat", { color: "#d8dde2", seed: 35 }), { x: -0.62 + i * 0.07, y: 0.42, z: 0.05 }));
    propsG.position.set(1.7, 0, -29.6); W.add(propsG, { name: "hero-props", foreground: true });
    // sleeping figures (shown only while they sleep, via onFrame)
    const sleeper = (x, z, ry, coat) => {
      const g = new THREE.Group();
      g.add(kit.box(0.52, 0.26, 1.65, mat("flat", { color: coat, seed: 40 }), { y: 0.14 }));
      g.add(kit.ball(0.17, mat("flat", { color: "#f3e3cf", seed: 41 }), { y: 0.16, z: 0.95 }));
      const mound = kit.ball(0.55, mat("flat", { color: "#f6fafd", seed: 42 }), { y: 0.05, z: -0.2 }); mound.scale.y = 0.35; g.add(mound);
      g.position.set(x, 0, z); g.rotation.y = ry; g.visible = false;
      return W.add(g, { name: "sleeper", collide: false });
    };
    const sleepW = sleeper(-0.7, -33.2, 1.3, "#2e4a7a"), sleepC = sleeper(0.8, -33.6, 1.1, "#3f6b4f");
    const sign5 = signPost("5 MIN", -2.1, -31.9, 0.5), sign30 = signPost("30 MIN", -2.1, -31.9, 0.5);
    sign5.visible = false; sign30.visible = false;

    // ---------- cast ----------
    const PARK = [0, -60];
    const shackleton = cast.add({ name: "shackleton", look: makeLook(rand.fork(1), "adult", { fem: false, outfit: "coat", top: "#7a3b2e", accent: "#e8dcc3", hat: "cap", hatColor: "#3a2e28", hairStyle: "short", mustache: true, beard: false, glasses: false, build: 1.05 }), pos: [-2.2, -1.5], h: 1.78 });
    const worsley = cast.add({ name: "worsley", look: makeLook(rand.fork(2), "adult", { fem: false, outfit: "coat", top: "#2e4a7a", accent: "#d8c9a3", hat: "beret", hatColor: "#24304a", hairStyle: "short", mustache: false, beard: true, glasses: false, build: 0.95 }), pos: PARK, h: 1.74 });
    const crean = cast.add({ name: "crean", look: makeLook(rand.fork(3), "adult", { fem: false, outfit: "coat", top: "#3f6b4f", accent: "#e3d3ac", hat: "cap", hatColor: "#2e4034", hairStyle: "short", mustache: false, beard: false, glasses: false, build: 1.15 }), pos: PARK, h: 1.8 });
    const fourth = cast.add({ name: "fourth", look: makeLook(rand.fork(4), "adult", { fem: false, outfit: "coat", top: "#9aa3ad", accent: "#c8ced6", hat: "none", hairStyle: "bald", mustache: false, beard: false, glasses: false, build: 1.0 }), pos: PARK, h: 1.76, visible: false });
    const surv1 = cast.add({ name: "surv1", look: makeLook(rand.fork(5), "adult", { fem: false, outfit: "coat", top: "#5a4a6b", hat: "bowler", hatColor: "#33283f", hairStyle: "short", glasses: false }), pos: PARK, h: 1.72 });
    const surv2 = cast.add({ name: "surv2", look: makeLook(rand.fork(6), "adult", { fem: false, outfit: "coat", top: "#6b5a2e", hat: "cap", hatColor: "#4a3d1e", hairStyle: "short", mustache: true, glasses: false }), pos: PARK, h: 1.7 });

    const T = {
      hook: 0, suddenly: at("وفجأة"), boat: at("بعد"), road: at("طريق"), cross: at("إنهم"),
      tired: at("من", 29), fell: at("ووقعوا"), wake: at("ولما"), lied: at("كدب"), then: at("في", 39),
      confess: at("لحد", 43), creanSays: at("وكرين", 46), three: at("التلاتة"),
      climbers: at("متسلقين"), sailors: at("وبحارة"), survivors: at("وناجين"), told: at("حكوا"), phenom: at("ظاهرة"),
    };

    // Shackleton
    shackleton.face(0, "determined").walk(0.03, 6.9, [[0.9, 3.8]])
      .place(T.suddenly, [0.4, 1.2]).walk(T.suddenly, 9.4, [[1.3, 0.4]]).face(at("يحس"), "worried").turn(at("حاسس"), "left")
      .place(T.boat, [45, 0.15]).face(T.boat, "determined").arms(at("الجنوبي"), "point")
      .place(T.road, [-42.5, 2.5]).face(T.road, "worried")
      .place(T.cross, [-0.4, -36.5]).walk(T.cross, 29.5, [[-0.2, -31.2]]).face(T.cross, "determined")
      .place(T.tired, [-0.2, -31.6]).walk(T.tired, 32.1, [[-0.1, -30.4]]).turn(at("التعب"), "left")
      .place(T.fell, [1.6, -32.2]).face(T.fell, "thinking").arms(at("سابهم"), "cross")
      .place(T.wake, [1.2, -32.6]).arms(T.wake, "reach").face(T.wake, "determined")
      .place(T.lied, [1.3, -32.6]).face(T.lied, "grin").talk(T.lied, at("كاملة")).arms(at("نص"), "point")
      .place(T.then, [0.8, 0.6]).face(at("الوقت"), "thinking").arms(at("الوقت"), "think").turn(at("الرابع"), "left")
      .place(T.confess, [-0.7, 1.5]).face(T.confess, "neutral").arms(T.confess, "idle")
      .place(T.three, [-1.2, 1.2]).face(T.three, "determined")
      .place(T.climbers, PARK).place(T.sailors, PARK)
      .place(T.survivors, [-44, -1]).face(T.survivors, "grin")
      .place(T.told, [0.2, 0.9]).turn(at("الرفيق"), "left")
      .place(T.phenom, [0.2, 0.9]);
    // Worsley
    worsley.place(T.boat, [43.8, 0]).face(T.boat, "worried")
      .place(T.road, [-43.5, 3.2])
      .place(T.cross, [0.5, -37.3]).walk(T.cross, 29.5, [[0.6, -32.0]]).face(T.cross, "determined")
      .place(T.tired, [0.6, -32.4]).walk(T.tired, 32.1, [[0.7, -31.3]]).face(at("التعب"), "sleepy")
      .hide(T.fell).place(T.wake, [-0.3, -33.0]).show(T.wake).face(T.wake, "surprised").face(at("نص"), "shocked").face(at("كاملة"), "grin")
      .place(T.then, PARK)
      .place(T.confess, [0.6, 0.8]).face(T.confess, "worried").talk(at("ورسلي", 44), at("الإحساس")).face(at("الإحساس"), "determined")
      .place(T.three, [0.8, 0.2])
      .place(T.climbers, PARK).place(T.sailors, [45, 0]).arms(T.sailors, "point").face(T.sailors, "determined")
      .place(T.survivors, PARK).place(T.told, [1.2, 0.3]).place(T.phenom, [1.2, 0.3]);
    // Crean
    crean.place(T.boat, [46.2, -0.1]).face(T.boat, "worried")
      .place(T.road, [-41.8, 2.2])
      .place(T.cross, [-1.2, -38.0]).walk(T.cross, 29.5, [[-1.0, -32.8]]).face(T.cross, "determined")
      .place(T.tired, [-1.0, -33.2]).walk(T.tired, 32.1, [[-0.9, -32.1]]).face(at("التعب"), "sleepy")
      .hide(T.fell).place(T.wake, [0.6, -33.5]).show(T.wake).face(T.wake, "surprised").face(at("نص"), "shocked").face(at("كاملة"), "grin")
      .place(T.then, PARK)
      .place(T.confess, [1.9, 0.2]).face(T.confess, "neutral").face(at("أكد"), "determined").arms(at("أكد"), "point")
      .place(T.three, [2.4, 1.4])
      .place(T.climbers, [6, -38]).face(T.climbers, "determined").arms(T.climbers, "reach")
      .place(T.sailors, PARK).place(T.survivors, PARK).place(T.told, [2.1, 1.1]).place(T.phenom, [2.1, 1.1]);
    // Fourth presence (edge only, at cuts)
    fourth.place(T.suddenly, [1.9, -0.3]).show(T.suddenly).hide(T.boat)
      .place(T.three, [2.9, -0.9]).show(T.three).hide(T.climbers)
      .place(T.told, [-1.9, -0.6]).show(T.told).hide(T.phenom);
    // Camp survivors
    surv1.place(T.road, [-46, -1]).face(T.road, "sad").place(T.cross, PARK).place(T.survivors, [-44.8, 0.5]).place(T.told, PARK);
    surv2.place(T.road, [-44.8, 1.2]).face(T.road, "worried").place(T.cross, PARK).place(T.survivors, PARK).place(T.told, PARK);

    // ---------- fx ----------
    fx.emit("dust", 0.03, 11.7, [-0.5, 0.2, 1.2], { size: 0.3, count: 6, color: "#ffffff", rise: 0.25, spread: 1.0 });
    fx.add("question", at("غريبة"), at("حاسس"), [1.0, 2.35, 0.5], { size: 0.55 });
    fx.emit("splash", at("مركب"), at("مركب") + 1.2, [42.6, 0.15, 1.2], { size: 0.2, count: 14 });
    fx.emit("crowd", T.road, T.cross, [-45, 0.3, 0], { count: 22, size: 0.85, area: [9, 4], colors: ["#5a4a6b", "#6b5a2e", "#44586e", "#71584a", "#4f6650", "#8a7a5a"] });
    fx.emit("dust", T.cross, 35.7, [0, 0.2, -33], { size: 0.3, count: 6, color: "#ffffff", rise: 0.3, spread: 1.4 });
    fx.add("sweat", at("التعب"), at("مقدروش"), [0.7, 2.05, -32.2], { size: 0.45 });
    fx.add("sweat", at("التعب"), at("مقدروش"), [-0.9, 2.1, -33], { size: 0.45 });
    fx.emit("steam", at("الوقت"), at("بيه"), [0.8, 1.42, 1.05], { size: 0.16, count: 5, color: "#f4f1ec", rise: 0.35, spread: 0.2 });
    fx.emit("sparkle", at("بكيان"), at("معاهم"), [2.2, 1.1, 0.2], { size: 0.3, count: 8, spread: 1.4, color: "#ffe9a8" });
    fx.emit("sparkle", at("الرفيق"), at("شافه"), [-1.9, 1.2, -0.6], { size: 0.3, count: 8, spread: 1.2, color: "#ffe9a8" });

    // ---------- camera ----------
    const camera = [
      { t: 0, pos: [2.6, 1.8, 9.0], look: [-0.4, 1.2, 1.8], light: "day" },
      { t: T.suddenly, pos: [3.6, 1.8, 5.8], look: [0.9, 1.25, 0.3], light: "golden" },
      { t: T.boat, pos: [40.2, 2.0, 6.8], look: [44.4, 1.0, 0], light: "day", transition: "whip", whipDir: 1 },
      { t: T.road, ...aerial([-45, 0, 0], { height: 16, tilt: 0.5, yaw: 20 }), light: "day", transition: "dissolve", tframes: 8 },
      { t: T.cross, pos: [1.8, 1.9, -26.8], look: [0, 1.1, -33], light: "day", transition: "flash", tframes: 6 },
      { t: T.tired, pos: [2.8, 1.7, -28.2], look: [0.1, 1.1, -32.2], light: "day" },
      { t: T.fell, pos: [3.0, 2.0, -30.2], look: [0.2, 0.7, -33.4], light: "day", move: "pull" },
      { t: T.wake, pos: [3.0, 1.8, -29.6], look: [0.5, 1.2, -32.9], light: "day", move: "locked" },
      { t: T.lied, pos: [3.4, 1.8, -30.4], look: [1.3, 1.3, -32.6], light: "day", lens: { focus: "shackleton", px: 10 } },
      { t: T.then, pos: [2.4, 1.7, 3.4], look: [0.8, 1.3, 0.6], light: "golden", lens: { focus: "shackleton", px: 12 } },
      { t: T.confess, pos: [3.4, 1.7, 4.6], look: [0.6, 1.25, 0.8], light: "day" },
      { t: T.creanSays, pos: [3.6, 1.7, 3.2], look: [1.9, 1.25, 0.2], light: "day", glide: 24, path: [[3.8, 1.7, 4.0]] },
      { t: T.three, ...aerial([0.8, 0, 0.4], { height: 13, tilt: 0.5, yaw: 15 }), light: "day" },
      { t: T.climbers, pos: [3.2, 1.8, -34.5], look: [6, 1.4, -38], light: "day", move: "locked" },
      { t: T.sailors, pos: [41.5, 1.9, 4.5], look: [45, 1.1, 0], light: "day", move: "locked" },
      { t: T.survivors, pos: [-41, 1.7, 4.2], look: [-44, 1.1, -1], light: "golden" },
      { t: T.told, pos: [4.6, 1.9, 6.8], look: [0.6, 1.2, 0.6], light: "golden" },
      { t: T.phenom, pos: [5.0, 2.3, 9.5], look: [0.4, 1.1, 0.4], light: "golden", move: "pull" },
    ];
    const kicks = [
      { t: at("رابع"), amp: 0.04 },
      { t: at("مركب"), amp: 0.05 },
      { t: at("ووقعوا"), amp: 0.06 },
    ];
    const tSleep = T.fell, tWake = T.wake, tFive = at("خمس"), tHalf = at("نص");
    return {
      camera, kicks,
      onFrame(t) {
        const sleeping = t >= tSleep && t < tWake;
        sleepW.visible = sleeping; sleepC.visible = sleeping;
        sign1916.visible = t < T.boat;
        sign5.visible = t >= tFive && t < tWake;
        sign30.visible = t >= tHalf && t < T.then;
      },
    };
  },
};
