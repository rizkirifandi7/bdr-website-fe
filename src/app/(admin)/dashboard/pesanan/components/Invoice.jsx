import React from "react";
import { Text, Page, Document, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
	page: {
		padding: 10,
		fontSize: 10,
	},
	title: {
		fontSize: 14,
		textAlign: "center",
		marginBottom: 5,
	},
	transactionId: {
		fontSize: 10,
		textAlign: "center",
		marginBottom: 5,
	},
	separator: {
		marginVertical: 5,
		borderBottom: 1,
		borderBottomColor: "#000",
		borderBottomStyle: "dotted",
	},
	dateTable: {
		fontSize: 10,
		marginBottom: 2,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	dateTableParent: {
		flexDirection: "column",
		marginBottom: 10,
	},
	tableHead: {
		fontSize: 10,
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	tableBody: {
		fontSize: 10,
		marginBottom: 5,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	tableTotal: {
		fontSize: 10,
		paddingTop: 5,
		marginTop: 10,
		borderTop: 1,
		borderTopColor: "#000",
		borderTopStyle: "dotted",
		flexDirection: "column",
	},
});

const InvoiceTitle = () => <Text style={styles.title}>For Kitchen</Text>;

const TransactionId = ({ id }) => (
	<Text style={styles.transactionId}>{id}</Text>
);

const Separator = () => <View style={styles.separator} />;

const DateTable = ({ date, table, type, nama }) => {
	const formattedDate = new Date(date).toLocaleDateString("id-ID", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
	const formattedTime = new Date(date).toLocaleTimeString("id-ID", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<View style={styles.dateTableParent}>
			<View style={styles.dateTable}>
				<Text>{nama}</Text>
				<Text>Meja {table}</Text>
			</View>
			<View style={styles.dateTable}>
				<Text>
					{formattedDate},{formattedTime}
				</Text>
				<Text>{type}</Text>
			</View>
		</View>
	);
};

const TableHead = () => (
	<View style={styles.tableHead}>
		<Text>Item</Text>
		<Text>Qty</Text>
	</View>
);

const TableBody = ({ rowData }) => (
	<>
		{rowData.item_pesanan.map((item, index) => (
			<View key={index} style={styles.tableBody}>
				<Text>{item.menu.nama_menu}</Text>
				<Text>{item.jumlah}</Text>
			</View>
		))}
	</>
);

const TableCatatan = ({ rowData }) => (
	<View style={styles.tableTotal}>
		<Text>Catatan:</Text>
		<Text>{rowData}</Text>
	</View>
);

const Invoice = ({ rowData }) => {
	return (
		<Document>
			<Page size="A7" style={styles.page}>
				<InvoiceTitle />
				<TransactionId id={rowData.code_payment} />
				<Separator />
				<DateTable
					nama={rowData.nama_pelanggan}
					date={rowData.order_time}
					table={rowData.id_meja}
					type={rowData.mode}
				/>
				<Separator />
				<TableHead />
				<TableBody rowData={rowData} />
				<TableCatatan rowData={rowData.catatan} />
			</Page>
		</Document>
	);
};

export default Invoice;
