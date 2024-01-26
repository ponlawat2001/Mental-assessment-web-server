import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import info from "@assets/icons/svg/info.svg";
import AssessmentServices from "@app/services/assessment.service";

export default function AssessmentConfirmdialog(props?: any) {
  const [isloading, setLoading] = useState(false);

  function assessmentDelete(id: string) {
    setLoading(true);
    AssessmentServices.delete(id).then((_) => {
      setLoading(false);
      props.onClose();
      window.location.reload();
    });
  }

  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full gap-2 items-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex flex-col">
                <img width={86} src={info} />
                <p>ยืนยันที่จะทำการลบข้อมูล</p>
                <p className="font-thin">ตรวจสอบความถูกต้องก่อนทำการยืนยัน</p>
                {isloading ? (
                  <button
                    disabled={true}
                    className=" bg-gray-400 hover:bg-gray-400 transition"
                  >
                    Loading
                  </button>
                ) : (
                  <div className="flex w-full flex-row gap-4 mt-4">
                    <button
                      type="submit"
                      onClick={() => {
                        assessmentDelete(props.id);
                      }}
                      className=" text-white bg-validation hover:bg-validation-hover inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 transition"
                    >
                      ยืนยัน
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium bg-main10 hover:bg-main20 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      onClick={props.onClose}
                    >
                      ยกเลิก
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
