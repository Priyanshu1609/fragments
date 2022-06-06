/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import Button from "../Button";

interface IModal {
	readonly open: boolean;
	readonly onClose: () => void;
	readonly title?: string;
	readonly onOk?: () => void;
	readonly okText?: string;
	readonly width?: string;
	readonly disabled?: boolean;
	readonly loading?: boolean;
	readonly showCTA?: boolean;
}

const Modal: React.FC<IModal> = ({
	open,
	onClose,
	title,
	onOk,
	okText,
	children,
	width,
	disabled,
	loading,
	showCTA = true
}) => {
	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed z-10 inset-0 overflow-y-auto scrollbar-hide"
				onClose={() => { }}
			>
				<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 text-white overflow-y-auto scrollbar-hide">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0  bg-opacity-50 transition-opacity" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="hidden sm:inline-block sm:align-middle sm:h-screen"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<div
							className={`inline-block align-bottom bg-black pb-4 rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-lg w-full`}
						>
							<div className='w-full p-2 bg-[#1E1E24] border-b border-gray-400 border-solid justify-end'>
								<XIcon className='w-6 h-6 text-white ml-auto cursor-pointer' onClick={onClose} />
							</div>
							<div className="">
								<div className="mt-3 text-center sm:mt-5">
									{<Dialog.Title
										as="h3"
										className="text-2xl leading-6 font-medium font-montserrat"
									>
										{title}
									</Dialog.Title>}
									<div className="mt-2">{children}</div>
								</div>
							</div>
							{
								showCTA && (
									<div className="mt-5 sm:mt-6">
										<Button
											loading={loading}
											disabled={disabled}
											type="button"
											fullWidth
											// className="w-full"
											// className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cryptopurple sm:text-sm"
											onClick={onOk}
										>
											{okText}
										</Button>
									</div>
								)
							}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default Modal;
