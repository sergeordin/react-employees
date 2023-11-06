const { prisma } = require('../prisma/prisma-client');

/*
 * @route POST /api/employees/
 * @desc Get all employees
 * @access private
 */
const all = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch (error) {
        res.status(400).json({ message: 'Не удалось получить список сотрудников' });
    }
};

/*
 * @route POST /api/employees/add
 * @desc Add employee
 * @access private
 */
const add = async (req, res) => {
    try {
        const data = req.body.employee;
        if (!data.firstName || !data.lastName || !data.address || !data.age) {
            return res.status(500).json({ message: 'Все поля обязательные' });
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id,
            },
        });

        return res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({ message: 'Что-то пошло не так...' });
    }
};

/*
 * @route POST /api/employees/remove/:id
 * @desc Remove employee
 * @access private
 */
const remove = async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.employee.delete({
            where: {
                id,
            },
        });

        res.status(204).json('OK');
    } catch (error) {
        return res.status(500).json({ message: 'Не удалось удалить сотрудника' });
    }
};

/*
 * @route PUT /api/employees/edit/:id
 * @desc Edit employee
 * @access private
 */
const edit = async (req, res) => {
    const data = req.body;
    const id = data.id;

    try {
        await prisma.employee.update({
            where: { id },
            data,
        });

        res.status(204).json('OK');
    } catch (error) {
        return res.status(500).json({ message: 'Не удалось редактировать сотрудника' });
    }
};

/*
 * @route GET /api/employees/employees/:id
 * @desc Get employee
 * @access private
 */
const employee = async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await prisma.employee.findUnique({
            where: { id },
        });

        res.status(200).json(employee);
    } catch (error) {
        return res.status(500).json({ message: 'Не удалось получить сотрудника' });
    }
};

module.exports = {
    all,
    add,
    remove,
    edit,
    employee,
};
