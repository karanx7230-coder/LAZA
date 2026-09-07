import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: Colors.bgLight,
    borderRadius: 50,
  },
  backArrow: {
    fontSize: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  emptyText: {
    fontSize: 18,
    color: Colors.textMedium,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  orderDate: {
    fontSize: 12,
    color: Colors.textMedium,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  img: {
    width: 55,
    height: 55,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
  itemTextWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  price: {
    fontSize: 13,
    color: Colors.textMedium,
    marginTop: 3,
  },
  moreText: {
    fontSize: 13,
    color: Colors.textMedium,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  infoBlock: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f5f5f5',
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textMedium,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  infoSubValue: {
    fontSize: 12,
    color: Colors.textMedium,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  breakdownLabel: {
    fontSize: 13,
    color: Colors.textMedium,
  },
  breakdownValue: {
    fontSize: 13,
    color: Colors.textPrimary,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  itemCount: {
    fontSize: 13,
    color: Colors.textMedium,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
});

export default styles;
