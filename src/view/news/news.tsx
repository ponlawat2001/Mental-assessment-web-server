function News() {
  return (
    <div className=" flex flex-col  p-4 w-full gap-4">
      <div className="flex flex-row justify-between ">
        <p className="">ข่าวสารและบทความ</p>
        <p className="">Date time</p>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <button className="Delete w-24 rounded-3xl">ลบข่าว</button>
        <button className="w-24 rounded-3xl">เพิ่มข่าวสาร</button>
      </div>
      <div className="w-full bg-main5 rounded" style={{ height: 1 }}></div>
    </div>
  );
}

export default News;
