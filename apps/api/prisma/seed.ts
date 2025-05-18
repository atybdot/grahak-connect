import { faker } from "@faker-js/faker/locale/en_IN";
import prisma from "./index";

for (let i = 0; i < 100; i++) {
	const rd = faker.number.int({ min: -1, max: 1 });
	try {
		await prisma.user.create({
			data: {
				email: faker.internet.email(),
				firstName: faker.person.fullName(),
				password: faker.string.alphanumeric(5),
				orders: {
					create: {
						currency: "INR",
						deliveryStatus:
							rd === -1 ? "CANCEL" : rd === 0 ? "TRANSIT" : "SUCCESSFUL",
						placed: faker.date.recent({ days: 100 }),
						price: faker.number.int({ min: 100, max: 1000 }),
						title: faker.commerce.productName(),
					},
				},
			},
		});
	} catch (error) {
		console.log(error);
	}
}
console.log("DB seed successfully");
